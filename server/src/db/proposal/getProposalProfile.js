// Import
const db = require('../db');
const selectProposal = db.sql('./proposal/sql/selectProposal.sql');
const lookupCommitteeCategory = require('../preference/lookupCommitteeCategory');

// Functions
async function getProposalProfile(proposalId) {
  const proposal = await db.cx.query(selectProposal, {
    proposal: proposalId
  });
  const proposalData = proposal[0].data;
  const comittee = proposalData.committeeId;
  const category = await lookupCommitteeCategory(comittee);
  const proposalProfile = Object.assign({}, proposalData, { category: category });
  return proposalProfile;
}

// Export
module.exports = getProposalProfile;
