// Import
const db = require('../../db.js');
const fetch = require('node-fetch');

// Functions
async function getProposals (request, response) {
  const url = 'http://oda.ft.dk/api/Sag?$inlinecount=allpages&$filter=typeid%20eq%203';
  const proposals = await fetch(url).then(function (response) {
    return response.json();
  });
  response.send(proposals);
}

// Export
module.exports = {
  getProposals
}
