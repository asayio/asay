// Import
const getAuthToken = require('./getAuthToken');
const parseAuthToken = require('./parseAuthToken');
const lookupUser = require('../db/user/lookupUser');

// Function
async function getUser (request) {
  const authToken = await getAuthToken(request);
  const tokenInfo = await parseAuthToken(authToken);
  const userRow = await lookupUser(tokenInfo);
  return userRow
}

// Export
module.exports = getUser
