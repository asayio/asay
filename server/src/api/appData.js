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
const getCandidateList = require('../db/candidate/getCandidateList');
const getCandidateCommitmentList = require('../db/candidate/getCandidateCommitmentList');
const getConstituencyList = require('../db/candidate/getConstituencyList');

// Functions
async function appDataBundleFetcher(request, response) {
  try {
    const user = await getUser(request);
    const committeeCategoryList = await getCommitteeCategoryList();
    const proposalList = await getProposalList();
    const participationList = await getParticipationList();
    const projectSupportList = await getProjectSupportList();
    const constituencyList = await getConstituencyList();
    if (user) {
      const userId = user.id;
      const voteList = await getVoteList(userId);
      const subscriptionList = await getSubscriptionList(userId);
      const preferenceList = await getPreferenceList(userId);
      const committeeList = await getCommitteeList(userId);
      const notificationList = await getNotificationList(userId);
      const projectList = await getProjectList(userId);
      const userProjectSupportList = await getUserProjectSupportList(userId);
      const candidateList = await getCandidateList(userId);
      const candidateCommitmentList = await getCandidateCommitmentList(userId);
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
        userProjectSupportList,
        candidateList,
        candidateCommitmentList,
        constituencyList
      };
      response.send(bundle);
    } else {
      const preferenceList = await getPreferenceList();
      const projectList = await getProjectList();
      const candidateList = await getCandidateList();
      const candidateCommitmentList = await getCandidateCommitmentList();
      const bundle = {
        preferenceList,
        committeeCategoryList,
        proposalList,
        participationList,
        projectList,
        projectSupportList,
        candidateList,
        candidateCommitmentList,
        constituencyList
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
