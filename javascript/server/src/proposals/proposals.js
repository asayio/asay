// Import
const db = require('../../db.js');
const getTags = require('../proposal/tags/proposalTags.js').getTags

// Queries
const selectProposals = db.sql('./src/proposals/selectProposals.sql');

// Functions

async function getProposals (request, response) {
  var proposalsSansTags = await db.cx.query(selectProposals);
  // We need tags with the proposals on the proposal list so we can filter it
  // I'm trying to do something like this, but proposalsWithTags just returns promise pending
  // I'm missing something with these async calls...
  //
  // const proposalsWithTags = proposalsSansTags.map( async (proposal) => {
  //   proposal.tags = await getTags(proposal.id);
  //   return proposal;
  // });
  // response.send(proposalsWithTags);
  response.send(proposalsSansTags);
}

// Export
module.exports = {
  getProposals
}
