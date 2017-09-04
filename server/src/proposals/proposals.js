// Import
const db = require('../../db.js');
const fetch = require('node-fetch');

// Functions
async function getProposals (request, response) {
  const searchCriteria = request.params.searchCriteria;
  const proposalsUrl = 'http://oda.ft.dk/api/' + searchCriteria;
  const proposals = await fetch(proposalsUrl).then(function (response) {
    return response.json();
  });
  response.send(proposals);
}

async function getOpenDataCaseType (request, response) {
  const infoUrl = 'http://oda.ft.dk/api/Sagstype';
  const openDataCaseType = await fetch(infoUrl).then(function (response) {
    return response.json();
  });
  response.send(openDataCaseType);
}

async function getOpenDataPeriod (request, response) {
  const infoUrl = 'http://oda.ft.dk/api/Periode';
  const openDataPeriod = await fetch(infoUrl).then(function (response) {
    return response.json();
  });
  response.send(openDataPeriod);
}

// Export
module.exports = {
  getProposals: getProposals,
  getOpenDataCaseType: getOpenDataCaseType,
  getOpenDataPeriod: getOpenDataPeriod
}
