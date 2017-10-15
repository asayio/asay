// Import
const db = require('../db')
const insertSubscription = db.sql('./subscription/sql/insertSubscription.sql')

// Function
async function createSubscription (userId, proposalId) {
  const subscription = await db.cx.query(insertSubscription,
    {
      user: userId,
      proposal: proposalId,
    });
  return subscription
}

// Export
module.exports = createSubscription
