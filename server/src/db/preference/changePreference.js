// Import
const db = require('../db')
const updatePreference = db.sql('./preference/sql/updatePreference.sql')

// Functions
async function changePreference (userId, categoryId, preference) {
  await db.cx.query(updatePreference,
    {
      user: userId,
      category: categoryId,
      preference: preference,
    }
  )
}

// Export
module.exports = changePreference
