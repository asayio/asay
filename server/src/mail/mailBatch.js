// Import
const apiKey = process.env.SENDINBLUE;
const R = require('ramda')
const sendinblue = require('sendinblue-api')
const getUserList = require('../db/user/getUserList');
const getVoteList = require('../db/vote/getVoteList');
const getSubscriptionList = require('../db/subscription/getSubscriptionList.js');
const getPreferenceList = require('../db/preference/getPreferenceList');
const getCommitteeList = require('../db/preference/getCommitteeList');
const getCommitteeCategoryList = require('../db/preference/getCommitteeCategoryList')
const getProposalList = require('../db/proposal/getProposalList');
const getParticipationList = require('../db/vote/getParticipationList');
const getNotificationList = require('../db/notification/getNotificationList');
const fs = require('fs')
const cheerio = require('cheerio')

// Functions
async function mailBatch(schedule) {
  console.log('starting mail batch');
  const daysSinceLastJob = (schedule === 'weekly') ? 7 : 31
  const userList = await getUserList()
  const proposalList = await getProposalList()
  const committeeCategoryList = await getCommitteeCategoryList();
  const currentDate = new Date()
  const dateFilteredProposalList = R.filter(proposal => {
    const proposedDate = Date.parse(proposal.createdon)
    const timeSinceLastJob = 1000 * 60 * 60 * 24 * daysSinceLastJob
    return (currentDate - proposedDate) < timeSinceLastJob
  }, proposalList)
  if (!dateFilteredProposalList.length) {
    console.log('It seems there are no new proposals to notify users about!');
    return null
  }
  const formattedProposalList = dateFilteredProposalList.map(proposal => {
    const proposalId = proposal.id
    const categoryId = R.find(R.propEq('committee', proposal.data.committeeId))(committeeCategoryList).category
    return {proposalId, categoryId, shortTitel: proposal.data.shortTitel}
  })
  console.log('created relevant and formatted proposal list. Length: ' + formattedProposalList.length);
  let emailList = []
  for (const user of userList) {
    if (user.email_notification === schedule) {
      const subscriptionList = R.pluck('proposal')(await getSubscriptionList(user.id))
      const preferenceList = R.pluck('id')(R.filter(o => o.preference, await getPreferenceList(user.id)));
      const notificationList = R.pluck('proposal_id')(await getNotificationList(user.id))
      console.log('building filteredProposalList for user: ' + user.id);
      const filteredProposalList = R.filter(proposal => {
        const isSubscribing = subscriptionList.includes(proposal.proposalId)
        const isPreference = preferenceList.includes(proposal.categoryId)
        const hasNotSeen = !notificationList.includes(proposal.proposalId)
        return (isSubscribing || isPreference) && hasNotSeen
      }, formattedProposalList)
      filteredProposalList.length && emailList.push({userId: user.id, email: user.email, filteredProposalList, firstname: user.firstname})
  }}
  if (!emailList.length) {
    console.log('It seems there are no users to notify about new proposals!');
    return null
  }
  console.log('finished email list. Length: ' + emailList.length);
  for (const user of emailList) {
    fs.readFile(__dirname + '/template.html', 'utf8', function (err, html) {
      if (err) { throw err; }
      var client = new sendinblue({apiKey, timeout: 5000})
      const htmlNode = cheerio.load(html)

      htmlNode('#name').html(user.firstname)
      htmlNode('#number-of-proposals').html(user.filteredProposalList.length)
      for (const proposal of user.filteredProposalList) {
        htmlNode('#proposal-titel-field').after("<a href=https://app.initiativet.dk/proposal/" + proposal.proposalId + "><strong style='line-height:24px; font-size:16px; color:#222222;'>" + proposal.shortTitel + "</strong></a><br><br><br>")
      }
      htmlNode('#proposal-button').remove()
      const data = {
        "to": {
          [user.email]: user.firstname
        },
    		"from": [
          "dinevenner@initiativet.dk",
          "Initiativet"
        ],
    		"subject": "Der er kommet nye lovforslag til dig!",
    		"html": htmlNode.html()
    	}
      client.send_email(data, function(err, response) {
        console.log(response);
      })
    })
  }
}

// Export
module.exports = mailBatch
