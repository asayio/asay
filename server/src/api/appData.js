// Import
const getUser = require('../logic/getUser');
const getVoteList = require('../db/vote/getVoteList');
const getSubscriptionList = require('../db/subscription/getSubscriptionList.js');
const getPreferenceList = require('../db/preference/getPreferenceList');
const getCommitteeList = require('../db/preference/getCommitteeList');
const getCommitteeCategoryList = require('../db/preference/getCommitteeCategoryList');
const getProposalList = require('../db/proposal/getProposalList');
const getParticipationList = require('../db/vote/getParticipationList');
const getNotificationList = require('../db/notification/getNotificationList');
const getProjectList = require('../db/project/getProjectList');
const getProjectSupportList = require('../db/projectSupport/getProjectSupportList');
const getUserProjectSupportList = require('../db/projectSupport/getUserProjectSupportList');

// Functions
async function appDataBundleFetcher(request, response) {
  try {
    const user = await getUser(request);
    if (user) {
      const userId = user.id;
      const voteList = await getVoteList(userId);
      const subscriptionList = await getSubscriptionList(userId);
      const preferenceList = await getPreferenceList(userId);
      const committeeList = await getCommitteeList(userId);
      const committeeCategoryList = await getCommitteeCategoryList();
      const proposalList = await getProposalList();
      const participationList = await getParticipationList();
      const notificationList = await getNotificationList(userId);
      const projectList = await getProjectList(userId);
      const projectSupportList = await getProjectSupportList();
      const userProjectSupportList = await getUserProjectSupportList(userId);
      const bundle = {
        user,
        voteList,
        subscriptionList,
        preferenceList,
        committeeList,
        committeeCategoryList,
        proposalList,
        participationList,
        notificationList,
        projectList,
        projectSupportList,
        userProjectSupportList
      };
      response.send(bundle);
    } else {
      const preferenceList = await getPreferenceList();
      const committeeCategoryList = await getCommitteeCategoryList();
      const proposalList = await getProposalList();
      const participationList = await getParticipationList();
      const projectList = await getProjectList();
      const projectSupportList = await getProjectSupportList();
      const bundle = {
        preferenceList,
        committeeCategoryList,
        proposalList,
        participationList,
        projectList,
        projectSupportList
      };
      response.send(bundle);
    }
  } catch (err) {
    console.log(err);
    response.sendStatus(500);
  }
}

// Export
module.exports = appDataBundleFetcher;
