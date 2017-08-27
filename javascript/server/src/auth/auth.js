// Import
const jwt = require('jsonwebtoken');
const db = require('../../db.js')

// Queries
const selectUser = db.sql('./src/auth/selectUser.sql')

// Functions
function getToken (request) {
  authToken = request.headers.authorization.split(' ')[1];
  return authToken
}

async function lookupUser (authToken) {
  const clientSecret = process.env.AUTH0SECRET;
  const clientId = process.env.AUTH0CLIENTID;

  try {
    var tokenInfo = jwt.verify(authToken, clientSecret, {
      audience: clientId
    })
  } catch(err) {
    return null
  };

  const rowList = await db.cx.query(selectUser,
    {
      email: tokenInfo.email
    });
  return rowList.length > 0 ? rowList[0] : null;
}

async function loginPostHandler (request, response) {
  const authToken = request.params.authToken;
  const userRow = await lookupUser(authToken);
  const userStatus = userRow ? userRow : 401;
  response.send(userStatus)
}

// Export
module.exports = {
  loginPostHandler,
  lookupUser,
  getToken
}
