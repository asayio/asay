// Import
const db = require('../db')
const updateSubscription = db.sql('./subscription/sql/updateSubscription.sql')

// Function
async function changeSubscription (userId, proposalId, subscription) {
  const newSubscription = await db.cx.query(updateSubscription,
    {
      user: userId,
      proposal: proposalId,
      subscription
    });
  return newSubscription
}

// Export
module.exports = changeSubscription
