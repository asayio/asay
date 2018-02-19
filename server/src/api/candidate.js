// Import
const changeCandidate = require('../db/candidate/changeCandidate');
const createCandidate = require('../db/candidate/createCandidate');
const lookupCandidate = require('../db/candidate/lookupCandidate');
const getUser = require('../logic/getUser');

// Function
async function postCandidate(request, response) {
  try {
    const user = await getUser(request);
    if (user) {
      const userId = user.id;
      const candidate = request.body;
      const hasCandidacy = await lookupCandidate(userId);
      const testing = hasCandidacy ? true : false;
      if (hasCandidacy) {
        await changeCandidate(userId, candidate);
      } else {
        await createCandidate(userId, candidate);
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
