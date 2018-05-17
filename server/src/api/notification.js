// Import
const getUser = require('../logic/getUser');
const createNotification = require('../db/notification/createNotification');
const getNotification = require('../db/notification/getNotification');

// Function
async function postNotification(request, response) {
  response.sendStatus(200);
  try {
    const user = await getUser(request);
    if (user) {
      const userId = user.id;
      const proposalId = request.body.proposalId;
      const hasResults = request.body.hasResults;
      const hasSeen = await getNotification(proposalId, userId, 'seen');
      const hasSeenResults = !hasResults && (await getNotification(proposalId, userId, 'seenResults'));
      !hasSeen && createNotification(proposalId, userId, 'seen');
      !hasSeenResults && hasResults && createNotification(proposalId, userId, 'seenResults');
    }
  } catch (err) {
    console.log(err);
  }
}

// Export
module.exports = postNotification;
