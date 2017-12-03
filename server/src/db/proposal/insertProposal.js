// Import
const db = require('../db')
const insertProposal = db.sql('./proposal/sql/insertProposal.sql')

// Functions
async function createProposal (id, data) {
  await db.cx.query(insertProposal, {id, data})
}

// Export
module.exports = createProposal
