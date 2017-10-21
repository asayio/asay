import R from 'ramda'

export default async function appDataBundleFetcher () {
  const appDataBundleResponse = await fetch('/api/appDataBundle/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.sessionStorage.authToken
      }
    }
  );
  const appDataBundle = await appDataBundleResponse.json();
  console.log(appDataBundle);
  const voteList = appDataBundle.voteList
  const preferenceList = R.sort((a, b) => a.id - b.id, appDataBundle.preferenceList)
  const committeeList = appDataBundle.committeeList
  const subscriptionList = appDataBundle.subscriptionList
  const committeeCategoryList = appDataBundle.committeeCategoryList
  const proposalList = appDataBundle.proposalList.map(proposal => {
    const id = proposal.id
    const committeeId = proposal.data.committeeId
    const hasVoted = !!R.find(R.propEq('proposal', id))(voteList)
    const hasSubscription = R.find(R.propEq('proposal', id))(subscriptionList)
    const matchesCommittee = !!R.find(R.propEq('committee', committeeId))(committeeList)
    const matchesCategory = R.find(R.propEq('committee', committeeId))(committeeCategoryList)
    const category = R.find(R.propEq('id', matchesCategory.category))(preferenceList)
    const isSubscribing = (hasSubscription && hasSubscription.subscription) || matchesCommittee
    return Object.assign({}, proposal.data, {
      hasVoted,
      id,
      isSubscribing,
      category
    })
  })
  return {preferenceList, proposalList, voteList}
}
