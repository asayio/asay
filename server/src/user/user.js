// Import
const db = require('../../db.js')
const auth = require('../auth/auth.js')

// Queries
const updateTerms = db.sql('./src/user/updateTerms.sql')
const selectUser = db.sql('./src/user/selectUser.sql')
const insertUser = db.sql('./src/user/insertUser.sql')

// Functions
async function postTermsAccept (request, response) {
  try {
    const user = await auth.getUser(request);
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

async function lookupUser (tokenInfo) {
  const userList = await db.cx.query(selectUser, {
      email: tokenInfo.email
    }
  );
  const user = userList ? userList[0] : null;
  return user;
}

async function createUser (tokenInfo) {
  await db.cx.query(insertUser, {
      email: tokenInfo.email,
      firstname: tokenInfo.user_metadata.firstname,
      lastname: tokenInfo.user_metadata.lastname
    }
  );
}

// Export
module.exports = {
  postTermsAccept,
  lookupUser,
  createUser
}
