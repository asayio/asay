export default async function stageFetcher (options) {
  const proposalResponse = await fetch('/api/openData/stageFetcher/', {
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
