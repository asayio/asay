// Import
const jwt = require('jsonwebtoken');
const db = require('../../db.js')
const user = require('../user/user.js')

// Functions
async function getUser (request) {
  const authToken = await getToken(request);
  const tokenInfo = await parseToken(authToken)
  const userRow = await user.lookupUser(tokenInfo);
  return userRow
}

async function getToken (request) {
  authToken = request.headers.authorization.split(' ')[1];
  return authToken
}

async function parseToken (authToken) {
  const clientSecret = process.env.AUTH0SECRET;
  const clientId = process.env.AUTH0CLIENTID;
  try {
    var tokenInfo = jwt.verify(authToken, clientSecret, {
      audience: clientId
    })
  } catch(err) {
    var tokenInfo = false
  }
  return tokenInfo;
}

async function loginPostHandler (request, response) {
  const authToken = request.params.authToken;
  const tokenInfo = await parseToken(authToken);
  if (tokenInfo) {
    const userRow = await user.lookupUser(tokenInfo);
    if (!user) {
      const createUser = await user.createUser(tokenInfo);
      const newUser = await user.lookupUser(tokenInfo);
      response.send(newUser)
    } else {
      response.send(userRow)
    }
  } else {
    response.sendStatus(401);
  }
}

// Export
module.exports = {
  loginPostHandler,
  getToken,
  getUser,
  parseToken,
}
