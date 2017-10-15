// Import
const auth = require('./auth/auth.js');
const vote = require('./vote/vote.js');
const subs = require('./subscriptions/proposals/proposalSubscription.js');
const preferences = require('./preferences/preferences.js');
const getProposals = require('./proposal/proposal.js');

// Functions
async function appDataBundleFetcher(request, response) {
  const user = await auth.getUser(request);
  const userId = user.id
  const proposals = await getProposals();
  const voteHistory = await vote.getVoteHistory(userId);
  const categories = await preferences.getCategoryPreferences(userId);
  const bundle = { proposals, voteHistory , categories }
  response.send(bundle)
};

// Export
module.exports = {
  appDataBundleFetcher
}
