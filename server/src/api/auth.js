// Import
const lookupUser = require('../db/user/lookupUser')
const createUser = require('../db/user/createUser')
const parseAuthToken = require('../logic/parseAuthToken')

//Functions
async function loginPostHandler (request, response) {
  const authToken = request.params.authToken;
  const tokenInfo = await parseAuthToken(authToken);
  if (tokenInfo) {
    const knownUser = await lookupUser(tokenInfo);
    if (!knownUser) {
      const newUser = await createUser(tokenInfo);
      const user = await lookupUser(tokenInfo);
      response.send(user)
    } else {
      response.send(knownUser)
    }
  } else {
    response.sendStatus(401);
    console.log(err);
  }
}

// Export
module.exports = loginPostHandler
