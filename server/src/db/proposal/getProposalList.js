// Import
const db = require('../db')
const findStageInfo = require('./findStageInfo')

// Functions
async function getProposalList () {
  const proposals = await db.cx.query('select * from proposal')
  const proposalListWithStageInfo = proposals.map(proposal => {
    const stageInfo = findStageInfo(proposal.data.stage)
    return Object.assign({}, {id: proposal.id}, proposal.data, stageInfo)
  })
  return proposalListWithStageInfo
}

// Export
module.exports = getProposalList
