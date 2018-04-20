// Import
const getUser = require('../logic/getUser');
const createNotification = require('../db/notification/createNotification');

// Function
async function postNotification(request, response) {
  try {
    const user = await getUser(request);
    if (user) {
      const userId = user.id;
      const proposalId = request.body.proposalId;
      const hasResults = request.body.hasResults;
      createNotification(proposalId, userId, 'seen');
      hasResults && createNotification(proposalId, userId, 'seenResults');
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
module.exports = postNotification;
