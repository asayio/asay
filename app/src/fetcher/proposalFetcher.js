export default async function proposalFetcher () {
  const proposalResponse = await fetch('/api/openData/proposalFetcher/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.sessionStorage.authToken
      }
    }
  );
  const proposals = await proposalResponse.json();
  return proposals
}
