export default function postVote (type, id, voteresult) {
  fetch(`/api/${type}/${id}/vote`,
    {
      method: 'POST',
      body: JSON.stringify({
        voteresult: voteresult
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.sessionStorage.authToken
      }
    }
  );
}
