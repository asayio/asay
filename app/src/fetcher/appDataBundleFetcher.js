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
  const proposalList = appDataBundle.proposals.map(proposal => {
    return Object.assign({}, {id: proposal.id}, proposal.data)
  })
  return {
    categories: appDataBundle.categories,
    proposalList,
    voteHistory: appDataBundle.voteHistory
  }
}
