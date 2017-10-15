export default async function proposalFetcher () {
  const proposalResponse = await fetch('/api/openData/proposalFetcher/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.sessionStorage.authToken
      }
    }
  );
  const packedProposalList = await proposalResponse.json();
  const proposalList = packedProposalList.map(proposal => {
    return Object.assign({}, {id: proposal.id}, proposal.info)
  })
  return proposals
}
