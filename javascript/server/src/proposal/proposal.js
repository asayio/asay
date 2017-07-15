// Import
const db = require('../../db.js');
const getArticles = require('./articles/proposalArticles.js').getArticles
const getAttachments = require('./attachments/proposalAttachments.js').getAttachments
const getPolls = require('./polls/proposalPolls.js').getPolls
const getTags = require('./tags/proposalTags.js').getTags

// Queries
const selectProposal = db.sql('./src/proposal/selectProposal.sql')

// Functions
async function getProposal (request, response) {
  const proposal = await db.cx.query(selectProposal,
    {
      proposal: 1, // request.body.proposalId
    });
  return proposal
}

async function getProposalBundle (request, response) {
  const proposalInfo = await getProposal(request, response);
  const articles = await getArticles(request, response);
  const attachments = await getAttachments(request, response);
  const polls = await getPolls(request, response)
  const tags = await getTags(request, response)
  const proposal = {proposalInfo, articles, attachments, polls, tags}
  response.send(proposal);
}

// Export
module.exports = {
  getProposalBundle,
  getProposal
}
