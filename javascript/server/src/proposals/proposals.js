// Import
const db = require('../../db.js');
const getTags = require('../proposal/tags/proposalTags.js').getTags

// Queries
const selectProposals = db.sql('./src/proposals/selectProposals.sql');

// Functions
async function getProposals (request, response) {
  var list = []
  var proposalsSansTags = db.cx.query(selectProposals).then( async function(proposalsSansTags) {
    var length = proposalsSansTags.length;
    var counter = 1;
    const proposalsWithTags = proposalsSansTags.map( async (proposal) => {
      proposal.tags = await getTags(proposal.id);
      list.push(proposal);
      if (counter < length){
        counter = counter +1;
      } else {
        response.send(list);
      }
      return proposal;
    });
  });
}

// Export
module.exports = {
  getProposals
}
