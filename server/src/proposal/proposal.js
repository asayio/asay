// Import
const db = require('../../db.js')

// Functions
async function getProposals () {
  const proposals = await db.cx.query('select * from proposal')
  return proposals
}

// Export
module.exports = getProposals
