// Import
const db = require('../db')
const updateSubscription = db.sql('./subscription/sql/updateSubscription.sql')

// Function
async function changeSubscription (userId, proposalId) {
  const subscription = await db.cx.query(updateSubscription,
    {
      user: userId,
      proposal: proposalId,
    });
  return subscription
}

// Export
module.exports = changeSubscription
