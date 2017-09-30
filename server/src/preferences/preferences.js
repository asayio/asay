// Import
const db = require('../../db.js')
const auth = require('../auth/auth.js')

// Queries
const selectCategoryPreferences = db.sql('./src/preferences/selectCategoryPreferences.sql')
// const insertVote = db.sql('./src/vote/insertVote.sql')
// const updateVote = db.sql('./src/vote/updateVote.sql')

// Functions
async function getCategoryPreferences (request, response) {
  try {
    const user = await auth.lookupUser(request.headers.authtoken);
    if (user) {
      const userId = user.id;
      const categoryPreferences = await db.cx.query(selectCategoryPreferences,
        {
          user: userId,
        }
      );
      response.send(categoryPreferences)
    } else {
      response.sendStatus(401)
    }
  }
  catch(err) {
    console.log(err);
    response.sendStatus(500)
  }
}

// Export
module.exports = {
  getCategoryPreferences
//  updatePreferences
}
