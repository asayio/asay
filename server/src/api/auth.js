// Import
const lookupUser = require('../db/user/lookupUser');
const createUser = require('../db/user/createUser');
const parseAuthToken = require('../logic/parseAuthToken');

//Functions
async function loginPostHandler(request, response) {
  const authToken = request.params.authToken;
  const tokenInfo = await parseAuthToken(authToken);
  if (tokenInfo) {
    const knownUser = await lookupUser(tokenInfo);
    const verified = tokenInfo.email_verified;
    if (verified) {
      if (!knownUser) {
        const newUser = await createUser(tokenInfo);
        const user = await lookupUser(tokenInfo);
        response.send({ user: user, exp: tokenInfo.exp });
      } else {
        response.send({ user: knownUser, exp: tokenInfo.exp });
      }
    } else {
      response.sendStatus(403);
    }
  } else {
    response.sendStatus(401);
  }
}

// Export
module.exports = loginPostHandler;
