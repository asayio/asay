// Import
const db = require('../db')
const updateProposal = db.sql('./proposal/sql/updateProposal.sql')

// Functions
async function changeProposal (id, data) {
  await db.cx.query(updateProposal, {id, data})
}

// Export
module.exports = changeProposal
