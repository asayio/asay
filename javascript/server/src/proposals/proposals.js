// Import
const db = require('../../db.js');
const fetch = require('node-fetch');

// Functions
async function getProposals (request, response) {
  const proposalsUrl = 'http://oda.ft.dk/api/Sag?$filter=typeid%20eq%203&$orderby=id%20desc&$expand=Sagsstatus,Periode';
  const proposals = await fetch(proposalsUrl).then(function (response) {
    return response.json();
  });
  response.send(proposals);
}

// Export
module.exports = {
  getProposals
}
