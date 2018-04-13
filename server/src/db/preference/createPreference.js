// Import
const db = require('../db')
const insertPreference = db.sql('./preference/sql/insertPreference.sql')

// Functions
async function createPreference (userId, categoryId, preference) {
  await db.cx.query(insertPreference,
    {
      user: userId,
      category: categoryId,
      preference: preference,
    }
  )
}

// Export
module.exports = createPreference
