import R from 'ramda'

async function initialState () {
  const appDataBundleResponse = await fetch('/api/appDataBundle/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.sessionStorage.authToken
      }
    }
  );
  const appDataBundle = await appDataBundleResponse.json();
  const committeeCategoryList = appDataBundle.committeeCategoryList
  const voteList = appDataBundle.voteList
  const subscriptionList = appDataBundle.subscriptionList
  const rawPreferenceList = appDataBundle.preferenceList
  const rawProposalList = appDataBundle.proposalList
  const preferenceList = buildPreferenceList(rawPreferenceList, committeeCategoryList)
  const proposalList = buildProposalList({
    rawProposalList,
    voteList,
    subscriptionList,
    committeeCategoryList,
    preferenceList
  })
  return {preferenceList, proposalList, voteList}
}

function buildPreferenceList (rawPreferenceList, committeeCategoryList) {
  const unsortedPreferenceList = rawPreferenceList.map(preference => {
    const committeeList = R.filter(committee => committee.category === preference.id)(committeeCategoryList)
    return Object.assign({}, preference, {committeeList: R.pluck('committee')(committeeList)})
  });
  return sortPreferenceList(unsortedPreferenceList)
}

function sortPreferenceList (unsortedPreferenceList) {
  const soretedPreferenceList = R.sort((a, b) => a.id - b.id, unsortedPreferenceList)
  return soretedPreferenceList
}

function buildProposalList ({rawProposalList, voteList, subscriptionList, committeeCategoryList, preferenceList}) {
  const proposalList = rawProposalList.map(proposal => {
    const id = proposal.id
    const committeeId = proposal.data.committeeId
    const hasVoted = !!R.find(R.propEq('proposal', id))(voteList)
    const hasSubscription = R.find(R.propEq('proposal', id))(subscriptionList)
    const matchesCategory = R.find(R.propEq('committee', committeeId))(committeeCategoryList)
    const category = R.find(R.propEq('id', matchesCategory.category))(preferenceList)
    const isSubscribing = (hasSubscription && hasSubscription.subscription) || category.preference
    return Object.assign({}, proposal.data, {
      hasVoted,
      id,
      isSubscribing,
      category
    })
  })
  return proposalList
}

function updatePreferences (state, entity) {
  const newPreference = Object.assign({}, entity, {preference: !entity.preference})
  const newPreferenceList = R.reject(R.propEq('id', entity.id))(state.preferenceList).concat(newPreference)
  const soretedPreferenceList = sortPreferenceList(newPreferenceList)
  return soretedPreferenceList
}

export default {
  initialState,
  updatePreferences
}
