// Import
const getUser = require('../logic/getUser');
const getVoteList = require('../db/vote/getVoteList');
const getSubscriptionList = require('../db/subscription/getSubscriptionList.js');
const getPreferenceList = require('../db/preference/getPreferenceList');
const getCommitteeList = require('../db/preference/getCommitteeList');
const getProposalList = require('../db/proposal/getProposalList');

// Functions
async function appDataBundleFetcher(request, response) {
  const user = await getUser(request);
  const userId = user.id
  const voteList = await getVoteList(userId);
  const subscriptionList = await getSubscriptionList(userId)
  const preferenceList = await getPreferenceList(userId);
  const committeeList = await getCommitteeList(userId);
  const proposalList = await getProposalList();
  const bundle = {
    voteList,
    subscriptionList,
    preferenceList,
    committeeList,
    proposalList
  }
  response.send(bundle)
};

// Export
module.exports = appDataBundleFetcher
