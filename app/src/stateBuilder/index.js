import R from 'ramda';
import findStageInfo from './findStageInfo';

async function initialState() {
  const appDataBundleResponse = await fetch('/api/appDataBundle/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.authToken
    }
  });
  if (appDataBundleResponse.ok) {
    const appDataBundle = await appDataBundleResponse.json();
    const user = appDataBundle.user;
    const committeeCategoryList = appDataBundle.committeeCategoryList;
    const notificationList = appDataBundle.notificationList || [];
    const voteList = appDataBundle.voteList || [];
    const subscriptionList = appDataBundle.subscriptionList || [];
    const participationList = appDataBundle.participationList;
    const rawPreferenceList = appDataBundle.preferenceList || [];
    const rawProposalList = appDataBundle.proposalList.map(proposal =>
      Object.assign({}, { id: proposal.id }, proposal.data)
    );
    const preferenceList = buildPreferenceList(rawPreferenceList, committeeCategoryList);
    const proposalList = buildProposalList({
      participationList,
      proposalList: rawProposalList,
      voteList,
      subscriptionList,
      committeeCategoryList,
      notificationList,
      preferenceList
    });
    return {
      user,
      preferenceList,
      proposalList,
      voteList,
      subscriptionList,
      committeeCategoryList,
      participationList,
      notificationList
    };
  }
}

function buildPreferenceList(rawPreferenceList, committeeCategoryList) {
  const unsortedPreferenceList = rawPreferenceList.map(preference => {
    const committeeList = R.filter(committee => committee.category === preference.id)(committeeCategoryList);
    return Object.assign({}, preference, { committeeList: R.pluck('committee')(committeeList) });
  });
  return sortPreferenceList(unsortedPreferenceList);
}

const sortPreferenceList = R.sortWith([R.ascend(R.prop('title'))]);

function buildProposalList({
  proposalList,
  voteList,
  subscriptionList,
  committeeCategoryList,
  notificationList,
  preferenceList,
  participationList
}) {
  const newProposalList = proposalList.map(proposal => {
    const id = proposal.id;
    const committeeId = proposal.committeeId;
    const participation = R.path(['participation'], R.find(R.propEq('proposal', id))(participationList)) || 0;
    const hasVoted = !!R.find(R.propEq('proposal', id))(voteList);
    const hasInfo = proposal.resume !== '' || R.path(['presentation', 'paragraphs', 'length'], proposal) > 0;
    const hasSubscription = R.find(R.propEq('proposal', id))(subscriptionList);
    const matchesCategory = R.find(R.propEq('committee', committeeId))(committeeCategoryList);
    const category = R.find(R.propEq('id', matchesCategory.category))(preferenceList);
    const stageInfo = findStageInfo(proposal.stage);
    const deadline = stageInfo.deadline;
    const distanceToDeadline = stageInfo.distanceToDeadline;
    const status = stageInfo.status; // Put results here when we get them
    /* const results = {};*/
    const isSubscribing = hasSubscription ? hasSubscription.subscription : category ? category.preference : false;
    const seeNotification = !R.find(notification => {
      return notification.proposal_id === id && notification.type === 'seen';
    }, notificationList);
    const seeResultsNotification =
      deadline === 'Afsluttet' /* replace w. results */ &&
      !R.find(notification => {
        return notification.proposal_id === id && notification.type === 'seenResults';
      }, notificationList);
    return Object.assign({}, proposal, {
      hasVoted,
      hasInfo,
      seeNotification,
      seeResultsNotification,
      id,
      isSubscribing,
      category,
      deadline,
      distanceToDeadline,
      status,
      participation
    });
  });
  return sortProposalList(newProposalList);
}

const sortProposalList = R.sortWith([
  R.ascend(R.prop('distanceToDeadline')),
  R.descend(R.prop('hasInfo')),
  R.descend(R.prop('participation'))
]);

function updatePreferences(state, entity) {
  const newPreference = Object.assign({}, entity, { preference: !entity.preference });
  const newPreferenceList = R.reject(R.propEq('id', entity.id))(state.preferenceList).concat(newPreference);
  const sortedPreferenceList = sortPreferenceList(newPreferenceList);
  const newProposalList = buildProposalList(Object.assign({}, state, { preferenceList: sortedPreferenceList }));
  const newState = Object.assign({}, state, { proposalList: newProposalList, preferenceList: sortedPreferenceList });
  return newState;
}

function updateVoteList(state, entity) {
  const newVoteList = R.reject(R.propEq('proposal', entity.proposal))(state.voteList).concat(entity);
  const newParticipationCount =
    (R.path(['participation'], R.find(R.propEq('proposal', entity.proposal))(state.participationList)) || 0) + 1;
  const newParticipation = { proposal: entity.proposal, participation: newParticipationCount };
  const newParticipationList = R.reject(R.propEq('proposal', entity.proposal))(state.participationList).concat(
    newParticipation
  );
  const newProposalList = buildProposalList(
    Object.assign({}, state, { voteList: newVoteList, participationList: newParticipationList })
  );
  const newState = Object.assign({}, state, {
    proposalList: newProposalList,
    voteList: newVoteList,
    participationList: newParticipationList
  });
  return newState;
}

function updateSubscriptionList(state, entity) {
  const newSubscriptionList = R.reject(R.propEq('proposal', entity.proposal))(state.subscriptionList).concat(entity);
  const newProposalList = buildProposalList(Object.assign({}, state, { subscriptionList: newSubscriptionList }));
  const newState = Object.assign({}, state, { proposalList: newProposalList, subscriptionList: newSubscriptionList });
  return newState;
}

function updateNotificationList(state, entity) {
  const newNotificationList = R.append(entity, state.notificationList);
  const newProposalList = buildProposalList(Object.assign({}, state, { notificationList: newNotificationList }));
  const newState = Object.assign({}, state, { proposalList: newProposalList, notificationList: newNotificationList });
  return newState;
}

function updateUser(state, entity) {
  const newState = Object.assign({}, state, { user: entity });
  return newState;
}

function updateSearchString(state, entity) {
  const newState = Object.assign({}, state, { searchString: entity.searchString });
  return newState;
}

function updateFilter(state, entity) {
  const newFilter = Object.assign({}, state.filter, entity);
  const newState = Object.assign({}, state, { filter: newFilter });
  return newState;
}

export default {
  initialState,
  updatePreferences,
  updateVoteList,
  updateSubscriptionList,
  updateSearchString,
  updateNotificationList,
  updateFilter,
  updateUser
};
