// Import
const db = require('../db')
const updateProposalState = db.sql('./proposal/sql/updateProposalState.sql')

// Functions
async function changeProposalState (id, state) {
  await db.cx.query(updateProposalState, {id, state})
}

// Export
module.exports = changeProposalState
