// Import
const R = require('ramda');
const db = require('../db');
const findStageInfo = require('./findStageInfo');
const getVoteResults = require('../vote/getVoteResults');

// Functions
async function getProposalList() {
  const proposals = await db.cx.query('select * from proposal');
  return proposals;
}

// Export
module.exports = getProposalList;
