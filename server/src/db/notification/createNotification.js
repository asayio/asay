// Import
const db = require('../db')
const insertNotification = db.sql('./notification/sql/insertNotification.sql')

// Functions
async function createNotification (proposalId, userId, type) {
  await db.cx.query(insertNotification,
    {
      proposalId,
      userId,
      type
    }
  )
}

// Export
module.exports = createNotification
