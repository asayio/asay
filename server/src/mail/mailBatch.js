// Import
const R = require('ramda')
const getUserList = require('../db/user/getUserList');
const getVoteList = require('../db/vote/getVoteList');
const getSubscriptionList = require('../db/subscription/getSubscriptionList.js');
const getPreferenceList = require('../db/preference/getPreferenceList');
const getCommitteeList = require('../db/preference/getCommitteeList');
const getCommitteeCategoryList = require('../db/preference/getCommitteeCategoryList')
const getProposalList = require('../db/proposal/getProposalList');
const getParticipationList = require('../db/vote/getParticipationList');
const getNotificationList = require('../db/notification/getNotificationList');


// Functions
async function mailBatch(request, response) {
  console.log('starting mail batch');
  const userList = await getUserList()
  const proposalList = await getProposalList()
  const committeeCategoryList = await getCommitteeCategoryList();
  const currentDate = new Date()
  const dateFilteredProposalList = R.filter(proposal => {
    const proposedDate = Date.parse(proposal.createdon)
    const oneWeek = 1000 * 60 * 60 * 24 * 7
    return (currentDate - proposedDate) < oneWeek
  }, proposalList)
  if (!dateFilteredProposalList.length) {
    console.log('It seems there are no new proposals to notify users about!');
    return null
  }
  const formattedProposalList = dateFilteredProposalList.map(proposal => {
    const proposalId = proposal.id
    const categoryId = R.find(R.propEq('committee', proposal.data.committeeId))(committeeCategoryList).category
    return {proposalId, categoryId}
  })
  console.log('created relevant and formatted proposal list. Length: ' + formattedProposalList.length);
  let emailList = []
  for (const user of userList) {
    const subscriptionList = R.pluck('proposal')(await getSubscriptionList(user.id))
    const preferenceList = R.pluck('id')(R.filter(o => o.preference, await getPreferenceList(user.id)));
    const notificationList = R.pluck('proposal_id')(await getNotificationList(user.id))
    console.log('building proposalIdList for user: ' + user.id);
    const proposalIdList = R.pluck('proposalId')(R.filter(proposal => {
      const isSubscribing = subscriptionList.includes(proposal.proposalId)
      const isPreference = preferenceList.includes(proposal.categoryId)
      const hasNotSeen = !notificationList.includes(proposal.proposalId)
      return (isSubscribing || isPreference) && hasNotSeen
    }, formattedProposalList))
    proposalIdList.length && emailList.push({userId: user.id, email: user.email, proposalIdList})
  }
  if (!emailList.length) {
    console.log('It seems there are no users to notify about new proposals!');
    return null
  }
  console.log('finished email list. Length: ' + emailList.length);
}

// Export
module.exports = mailBatch
