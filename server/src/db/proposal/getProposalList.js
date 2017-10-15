// Import
const db = require('../db')

// Functions
async function getProposalList () {
  const proposals = await db.cx.query('select * from proposal')
  return proposals
}

// Export
module.exports = getProposalList
