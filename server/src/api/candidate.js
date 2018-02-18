// Import
const changeCandidate = require('../db/projectSupport/changeCandidate');
const createCandidate = require('../db/projectSupport/createCandidate');
const lookupCandidate = require('../db/projectSupport/lookupCandidate');
const getUser = require('../logic/getUser');

// Function
async function postCandidate(request, response) {
  try {
    const user = await getUser(request);
    if (user) {
      const userId = user.id;
      const candidate = request.body;
      const currentCandidate = await lookupCandidate(userId);
      const hasCandidacy = currentCandidate.length > 0 ? true : false;
      if (hasCandidacy) {
        changeCandidate(userId, candidate);
      } else {
        createCandidate(userId, candidate);
      }
      response.sendStatus(200);
    } else {
      response.sendStatus(401);
    }
  } catch (err) {
    response.sendStatus(500);
    console.log(err);
  }
}

// Export
module.exports = postCandidate;
