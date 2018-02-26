// Import
const R = require('ramda');
const db = require('../db')
const findStageInfo = require('./findStageInfo')
const getVoteResults = require('../vote/getVoteResults')

// Functions
async function getProposalList () {
  const proposals = await db.cx.query('select * from proposal')
  let proposalListWithStageInfo = []
  for (const proposal of proposals) {
    const results = R.path(['deadline'], proposal.data) === "Afsluttet" && await getVoteResults(proposal.id)
    proposalListWithStageInfo.push(Object.assign({}, {id: proposal.id, results, state: proposal.state}, proposal.data))
  }
  return proposalListWithStageInfo
}

// Export
module.exports = getProposalList
