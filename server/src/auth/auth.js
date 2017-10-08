// Import
const jwt = require('jsonwebtoken');
const db = require('../../db.js')

// Queries
const selectUser = db.sql('./src/auth/selectUser.sql')
const insertUser = db.sql('./src/auth/insertUser.sql')

// Functions
async function getUser (request) {
  const authToken = await getToken(request);
  const tokenInfo = await parseToken(authToken)
  const user = await lookupUser(tokenInfo);
  return user
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

async function lookupUser (tokenInfo) {
  const userList = await db.cx.query(selectUser, {
      email: tokenInfo.email
    });
  const user = userList ? userList[0] : null;
  return user;
}

async function loginPostHandler (request, response) {
  const authToken = request.params.authToken;
  const tokenInfo = await parseToken(authToken);
  if (tokenInfo) {
    const user = await lookupUser(tokenInfo);
    if (!user) {
      const createUser = await db.cx.query(insertUser, {
          email: tokenInfo.email,
          firstname: tokenInfo.user_metadata.firstname,
          lastname: tokenInfo.user_metadata.lastname
        });
      const newUser = await lookupUser(tokenInfo);
      response.send(newUser)
    } else {
      response.send(user)
    }
  } else {
    response.sendStatus(401);
  }
}

// Export
module.exports = {
  loginPostHandler,
  lookupUser,
  getToken,
  getUser,
  parseToken,
}
