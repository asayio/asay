// Import
const db = require('../../db.js');
const getArticles = require('./articles/proposalArticles.js').getArticles
const getAttachments = require('./attachments/proposalAttachments.js').getAttachments
const getPolls = require('./polls/proposalPolls.js').getPolls
const getTags = require('./tags/proposalTags.js').getTags
const fetch = require('node-fetch');

// Queries
const selectProposal = db.sql('./src/proposal/selectProposal.sql')

// Functions
async function getProposal (proposalId, response) {
  const proposalUrl = 'http://oda.ft.dk/api/Sag?$filter=id%20eq%20' + proposalId;
  const proposal = await fetch(proposalUrl).then(function (response) {
    return response.json();
  });
  return proposal;
}

async function getProposalBundle (request, response) {
  // Variables
  const proposalId = request.params.id
  const userId = 1 // collect through auth ...

  // Functions
  const proposalInfo = await getProposal(proposalId);
  const articles = await getArticles(proposalId, userId);
  const attachments = await getAttachments(proposalId);
  const polls = await getPolls(proposalId, userId)
  const tags = await getTags(proposalId)
  const proposal = {proposalInfo, articles, attachments, polls, tags}
  response.send(proposal);
}

// Export
module.exports = {
  getProposalBundle,
  getProposal
}
