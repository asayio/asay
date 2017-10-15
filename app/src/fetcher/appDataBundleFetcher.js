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
  console.log(categories);
  const proposalList = appDataBundle.proposals.map(proposal => {
    const id = proposal.id
    const hasVoted = R.find(R.propEq('proposal', id))(voteHistory)
    return Object.assign({}, {id}, proposal.data, {hasVoted: !!hasVoted})
  })
  return {categories, proposalList, voteHistory}
}
