// Import
const db = require('../db');
const updateResultNotification = db.sql('./user/sql/updateUserResultNotification.sql');

// Functions
async function changeUserResultNotification(userId, resultnotification) {
  await db.cx.query(updateResultNotification, {
    user: userId,
    resultnotification
  });
}

// Export
module.exports = changeUserResultNotification;
