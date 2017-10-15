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
  const voteList = appDataBundle.voteList
  const preferenceList = appDataBundle.preferenceList
  const committeeList = appDataBundle.committeeList
  const subscriptionList = appDataBundle.subscriptionList
  const proposalList = appDataBundle.proposalList.map(proposal => {
    const id = proposal.id
    const committeeId = proposal.data.committeeId
    const hasVoted = !!R.find(R.propEq('proposal', id))(voteList)
    const hasSubscription = R.find(R.propEq('proposal', id))(subscriptionList)
    const matchesCommittee = !!R.find(R.propEq('committee', committeeId))(committeeList)
    const isSubscribing = (hasSubscription && hasSubscription.subscription) || matchesCommittee
    return Object.assign({}, proposal.data, {
      hasVoted,
      id,
      isSubscribing
    })
  })
  return {preferenceList, proposalList, voteList}
}
