import R from 'ramda';

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
    const constituencyList = appDataBundle.constituencyList;
    const notificationList = appDataBundle.notificationList || [];
    const voteList = appDataBundle.voteList || [];
    const projectSupportList = appDataBundle.projectSupportList || [];
    const userProjectSupportList = appDataBundle.userProjectSupportList || [];
    const subscriptionList = appDataBundle.subscriptionList || [];
    const participationList = appDataBundle.participationList;
    const rawPreferenceList = appDataBundle.preferenceList || [];
    const rawProjectList = appDataBundle.projectList;
    const rawProposalList = appDataBundle.proposalList;
    const rawCandidateList = appDataBundle.candidateList;
    const candidateCommitmentList = appDataBundle.candidateCommitmentList;
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
    const projectList = buildProjectList({
      projectList: rawProjectList,
      preferenceList,
      projectSupportList,
      userProjectSupportList
    });
    const candidateList = buildCandidateList({
      candidateList: rawCandidateList,
      candidateCommitmentList,
      constituencyList,
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
      notificationList,
      projectList,
      projectSupportList,
      userProjectSupportList,
      constituencyList,
      candidateCommitmentList,
      candidateList
    };
  }
}

function buildCandidateList({ candidateList, candidateCommitmentList, constituencyList, preferenceList }) {
  const newCandidateList = candidateList.map(candidate => {
    const constituency = R.find(R.propEq('id', candidate.constituency))(constituencyList);
    const candidateCommitments = R.filter(commitment => candidate.id === commitment.candidate)(candidateCommitmentList);
    const commitments = candidateCommitments.map(commitment => {
      const category = R.find(R.propEq('id', commitment.category))(preferenceList);
      const categoryObject = Object.assign({}, commitment, {
        category: category
      });
      return categoryObject;
    });
    const newCandidate = Object.assign({}, candidate, {
      constituency,
      commitments
    });
    return newCandidate;
  });
  return newCandidateList;
}

function buildPreferenceList(rawPreferenceList, committeeCategoryList) {
  const unsortedPreferenceList = rawPreferenceList.map(preference => {
    const committeeList = R.filter(committee => committee.category === preference.id)(committeeCategoryList);
    return Object.assign({}, preference, { committeeList: R.pluck('committee')(committeeList) });
  });
  return sortPreferenceList(unsortedPreferenceList);
}

const sortPreferenceList = R.sortWith([R.ascend(R.prop('title'))]);

function buildProjectList({ projectList, preferenceList, projectSupportList, userProjectSupportList }) {
  const newProjectList = projectList.map(project => {
    const category = Number.isInteger(project.category)
      ? R.find(R.propEq('id', project.category))(preferenceList)
      : project.category;
    const initiator = { name: project.firstname + ' ' + project.lastname, bio: project.bio, email: project.email };
    const support = R.path(['support'], R.find(R.propEq('project', project.id))(projectSupportList)) || 0;
    const isSupporting = !!R.find(R.propEq('project', project.id))(userProjectSupportList) || false;
    const cleanProject = R.omit(['firstname', 'email', 'lastname', 'bio'], project);
    const createdon = Date.parse(project.createdon);
    const newProject = Object.assign({}, cleanProject, {
      category,
      initiator,
      support,
      isSupporting,
      createdon
    });
    return newProject;
  });
  return newProjectList;
}

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
    const deadline = proposal.deadline;
    const distanceToDeadline = proposal.distanceToDeadline;
    const status = proposal.status;
    const isSubscribing = hasSubscription ? hasSubscription.subscription : category ? category.preference : false;
    const seeNotification =
      isSubscribing &&
      !R.find(notification => {
        return notification.proposal_id === id && notification.type === 'seen';
      }, notificationList);
    const seeResultsNotification =
      deadline === 'Afsluttet' &&
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

function updateProjectList(state, entity) {
  const rawProject = Object.assign({}, entity, {
    email: state.user.email,
    firstname: state.user.firstname,
    lastname: state.user.lastname
  });
  const newProject = buildProjectList({
    projectList: [rawProject],
    preferenceList: state.preferenceList,
    projectSupportList: state.projectSupportList,
    userProjectSupportList: state.userProjectSupportList
  });
  const newProjectList = R.reject(R.propEq('id', entity.id))(state.projectList).concat(newProject[0]);
  const newState = Object.assign({}, state, { projectList: newProjectList });
  return newState;
}

function updateProjectSupportList(state, entity) {
  const projectSupport = R.find(R.propEq('project', entity.id), state.projectSupportList);
  const newProjectSupport = projectSupport
    ? Object.assign({}, projectSupport, {
        support: entity.isSupporting ? Number(projectSupport.support) - 1 : Number(projectSupport.support) + 1
      })
    : { project: entity.id, support: 1 };
  const newProjectSupportList = R.reject(R.propEq('project', entity.id))(state.projectSupportList).concat(
    newProjectSupport
  );
  const newUserProjectSupportList = entity.isSupporting
    ? R.reject(R.propEq('project', entity.id))(state.userProjectSupportList)
    : R.append({ project: entity.id }, state.userProjectSupportList);
  const newProjectList = buildProjectList({
    projectList: state.projectList,
    preferenceList: state.preferenceList,
    projectSupportList: newProjectSupportList,
    userProjectSupportList: newUserProjectSupportList
  });
  const newState = Object.assign({}, state, {
    projectList: newProjectList,
    projectSupportList: newProjectSupportList,
    userProjectSupportList: newUserProjectSupportList
  });
  return newState;
}

export default {
  initialState,
  updatePreferences,
  updateVoteList,
  updateSubscriptionList,
  updateSearchString,
  updateNotificationList,
  updateProjectList,
  updateFilter,
  updateUser,
  updateProjectSupportList
};
