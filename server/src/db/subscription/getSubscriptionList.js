// Import
const db = require('../db')
const selectSubscriptionList = db.sql('./subscription/sql/selectSubscriptionList.sql')

// Function
async function getSubscriptionList (userId) {
  const subscription = await db.cx.query(selectSubscriptionList,
    {
      user: userId,
    });
  return subscription
}

// Export
module.exports = getSubscriptionList
