// Import
const changeUserCandidateSupport = require('../db/user/changeUserCandidateSupport');
const getUser = require('../logic/getUser');

// Function
async function postUserCandidateSupport(request, response) {
  try {
    const user = await getUser(request);
    if (user) {
      const userId = user.id;
      const candidateId = request.params.id;
      await changeCandidateSupport(userId, candidateId);
      response.sendStatus(200);
    } else {
      response.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
    response.sendStatus(500);
  }
}

// Export
module.exports = postUserCandidateSupport;
