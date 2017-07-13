const jwt = require('jsonwebtoken');
const db = require('../../db.js')
const selectUser = db.sql('./sql/selectUser')

async function lookupUser (authToken) {
  const clientSecret = process.env.AUTH0SECRET;
  const clientId = process.env.AUTH0CLIENTID;
  const tokenInfo = jwt.verify(authToken, clientSecret, {
    audience: clientId
  });
  const rowList = await db.cx.query(selectUser,
    {
      email: tokenInfo.email
    });
  return rowList.length > 0 ? rowList[0] : null;
}

// Webserver functions
async function loginPostHandler (request, response) {
  const authToken = request.body.authToken;
  const userRow = await lookupUser(authToken);
  const status = userRow ? 200 : 401;
  response.sendStatus(status)
}

// Routes
function map(app) {
  app.post("/api/auth/login", loginPostHandler);
}

// Export to master
module.exports = {
  lookupUser,
  map
}
