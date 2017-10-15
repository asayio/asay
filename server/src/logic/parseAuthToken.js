// Import
const jwt = require('jsonwebtoken');

// Function
async function parseAuthToken (authToken) {
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

// Export
module.exports = parseAuthToken
