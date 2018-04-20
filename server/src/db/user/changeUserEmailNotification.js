// Import
const db = require('../db');
const updateEmailNotification = db.sql('./user/sql/updateUserEmailNotification.sql');

// Functions
async function changeUserEmailNotification(userId, emailnotification) {
  await db.cx.query(updateEmailNotification, {
    user: userId,
    emailnotification: emailnotification
  });
}

// Export
module.exports = changeUserEmailNotification;
