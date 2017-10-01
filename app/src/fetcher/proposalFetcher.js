export default async function proposalFetcher (options) {
  const proposalResponse = await fetch('/api/openData/proposalFetcher/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.sessionStorage.authToken
      },
      body: JSON.stringify(options)
    }
  );
  const proposals = await proposalResponse.json();
  return proposals
}
