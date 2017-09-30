// Import
const db = require('../../db.js')
const auth = require('../auth/auth.js')

// Queries
const updateTerms = db.sql('./src/user/updateTerms.sql')

// Functions
async function postTermsAccept (request, response) {
  try {
    const authToken = await auth.getToken(request);
    const user = await auth.lookupUser(authToken);
    if (user) {
      const userId = user.id;
      await db.cx.query(updateTerms,
        {
          user: userId
        })
      response.sendStatus(200)
    } else {
      response.sendStatus(401)
    }
  }
  catch(err) {
    response.sendStatus(500)
  }
}

// Export
module.exports = {
  postTermsAccept
}
