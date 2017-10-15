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
  const voteHistory = appDataBundle.voteHistory
  const categories = appDataBundle.categories
  const committee = appDataBundle.committee
  const subscriptions = appDataBundle.subscriptions
  const proposalList = appDataBundle.proposals.map(proposal => {
    const id = proposal.id
    const committeeId = proposal.data.committeeId
    const hasVoted = !!R.find(R.propEq('proposal', id))(voteHistory)
    const hasSubscription = R.find(R.propEq('proposal', id))(subscriptions)
    const matchesCommittee = !!R.find(R.propEq('committee', committeeId))(committee)
    const isSubscribing = (hasSubscription && hasSubscription.subscription) || matchesCommittee
    return Object.assign({}, proposal.data, {
      hasVoted,
      id,
      isSubscribing
    })
  })
  return {categories, proposalList, voteHistory}
}
