// Import
const db = require('../db')
const findStageInfo = require('./findStageInfo')
const getVoteResults = require('../vote/getVoteResults')

// Functions
async function getProposalList () {
  const proposals = await db.cx.query('select * from proposal')
  let proposalListWithStageInfo = []
  for (const proposal of proposals) {
    const stageInfo = findStageInfo(proposal.data.stage)
    const results = stageInfo.deadline === "Afsluttet" && await getVoteResults(proposal.id)
    proposalListWithStageInfo.push(Object.assign({}, {id: proposal.id, results: results}, proposal.data, stageInfo))
  }
  return proposalListWithStageInfo
}

// Export
module.exports = getProposalList
