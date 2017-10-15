// Import
const db = require('../db')
const selectSubscription = db.sql('./subscription/sql/selectSubscription.sql')

// Function
async function lookupSubscription (userId, proposalId) {
  const subscription = await db.cx.query(selectSubscription,
    {
      user: userId,
      proposal: proposalId,
    });
  return subscription
}

// Export
module.exports = lookupSubscription
