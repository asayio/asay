// Import
const auth = require('./auth/auth.js');
const vote = require('./vote/vote.js');
const subs = require('./subscriptions/proposals/proposalSubscription.js');
const preferences = require('./preferences/preferences.js');
const proposalBatchFetcher = require('./openData/proposalBatchFetcher')

// Functions
async function appDataBundleFetcher(request, response) {
  const user = await auth.getUser(request);
  const userId = user.id
  const voteHistory = await vote.getVoteHistory(userId);
  const openData = await proposalBatchFetcher();
  const categories = await preferences.getCategoryPreferences(userId);
  const bundle = { voteHistory, openData, categories }
  response.send(bundle)
};

// Export
module.exports = {
  appDataBundleFetcher
}
