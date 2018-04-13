// Import
const db = require('../db');
const updateUserDecleration = db.sql('./user/sql/updateUserDecleration.sql');

// Functions
async function changeUserDecleration(userId) {
  await db.cx.query(updateUserDecleration, {
    user: userId
  });
}

// Export
module.exports = changeUserDecleration;
