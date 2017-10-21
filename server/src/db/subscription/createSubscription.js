// Import
const db = require('../db')
const insertSubscription = db.sql('./subscription/sql/insertSubscription.sql')

// Function
async function createSubscription (userId, proposalId, subscription) {
  const newSubscription = await db.cx.query(insertSubscription,
    {
      user: userId,
      proposal: proposalId,
      subscription
    });
  return newSubscription
}

// Export
module.exports = createSubscription
