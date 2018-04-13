// Import
const db = require('../db')
const selectNotificationList = db.sql('./notification/sql/selectNotificationList.sql')

// Functions
async function getNotificationList (userId) {
  const notificationList = await db.cx.query(selectNotificationList,
    {
      userId
    }
  );
  return notificationList
}

// Export
module.exports = getNotificationList
