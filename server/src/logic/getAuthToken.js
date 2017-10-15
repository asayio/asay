async function getAuthToken (request) {
  authToken = request.headers.authorization.split(' ')[1];
  return authToken
}

// Export
module.exports = getAuthToken
