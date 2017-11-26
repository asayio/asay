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
  const dateFilteredProposalList = R.filter(proposal => { // we need proper creation dates for each proposal
    const proposedDate = Date.parse(R.head(proposal.data.stage).dato)
    const oneWeek = 1000 * 60 * 60 * 24 * 7
    return (currentDate - proposedDate) < oneWeek
  }, proposalList)
  if (!dateFilteredProposalList.length) {
    console.log('It seems there are no new proposals to notify users about!');
    return null
  }
  const formattedProposalList = dateFilteredProposalList.map(proposal => {
    const proposalId = proposal.id
    const categoryId = R.find(R.propEq('committee', proposal.committee))(committeeCategoryList)
    return {proposalId, categoryId}
  })
  console.log('created relevant and formatted proposal list. Length:' + formattedProposalList.length);
  const emailList = userList.map(async user => {
    const subscriptionList = await getSubscriptionList(user.id) // todo flatten
    const preferenceList = await getPreferenceList(user.id); // todo flatten
    const notificationList = await getNotificationList(user.id) // todo flatten
    console.log('building proposalIdList for user: ' + user.id);
    const proposalIdList = R.pluck('id')(R.filter(proposal => {
      const isSubscribing = subscriptionList.includes(proposal.id)
      const isPreference = preferenceList.includes(proposal.category)
      const hasNotSeen = !notificationList.includes(proposal.id)
      return (isSubscribing || isPreference) && hasNotSeen
    }, formattedProposalList))
    return {userId: user.id, email: user.email, proposalIdList}
  })
  const filteredEmailList = R.filter(user => {
    return user.proposalIdList.length
  }, emailList)
  if (!filteredEmailList.length) {
    console.log('It seems there are no users to notify about the new proposals!');
    return null
  }
  console.log('finished email list. Length: ' + filteredEmailList.length);
}

// Export
module.exports = mailBatch
