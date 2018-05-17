// Import
const db = require('../db')
const selectNotification = db.sql('./notification/sql/selectNotification.sql')

// Functions
async function getNotification (proposalId, userId, notificationType) {
  const notificationList = await db.cx.query(selectNotification,
    {
      proposal: proposalId,
      user: userId,
      type: notificationType
    }
  );
  return notificationList[0]
}

// Export
module.exports = getNotification
