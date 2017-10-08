// Import
const R = require('ramda')
const auth = require('../auth/auth.js')
const openDataFetcher = require('./openDataFetcher.js')
const vote = require('../vote/vote.js')
const committee = require('../preferences/preferences.js')

// Functions
async function proposalFetcher (request, response) {
  const user = await auth.getUser(request);
  const selectedSection = request.body.selectedSection
  const page = request.body.page
  const specificProposalId = request.body.specificProposalId
  let proposalIdList = []
  let entity = 'Sag'
  let orderByString = '?$orderby=id desc'
  let filterString = '&$filter='
  let expandString = '&$expand=Sagsstatus,Periode,Sagstype'
  if (selectedSection === 'alle forslag') {
    filterString += 'typeid eq 3 or typeid eq 5'
  } else if (selectedSection === 'udvalgte forslag') {
    entity = 'SagAkt%C3%B8r'
    expandString = '&$expand=Sag'
    const committees = await committee.getUserPreferredCommittees(user.id)
    committees.forEach(function ({committee}, index) {
      if (index === 0) {
        filterString += '(akt%C3%B8rid eq ' + committee;
      } else {
        filterString += ' or akt%C3%B8rid eq ' + committee;
      }
      if ((index + 1 === committees.length) || (committees.length === 1)) {
        filterString += ') and rolleid eq 11';
      }
    })
  } else if (selectedSection === 'afstemte forslag') {
    const voteHistory = await vote.getVoteHistory(request)
    proposalIdList = voteHistory.map(id => {
      return id.propsal
    })
    if (R.isEmpty(proposalIdList)) {
      response.send({
        value: {
          empty: true
        }
      })
    }
  } else if (specificProposalId) {
    proposalIdList = [specificProposalId]
  }
  if (proposalIdList.length > 0) {
    proposalIdList.forEach(function (id, index) {
      if (index === 0) {
        filterString += 'id eq ' + id;
      } else {
        filterString += ' or id eq ' + id;
      }
    })
  }
  if (page) {
    filterString += '&$skip=' + (page - 1) * 20;
  }
  const filter = entity + orderByString + expandString + filterString;
  const url = 'http://oda.ft.dk/api/' + filter
  const openData = await openDataFetcher.fetchOnePage(url)
  if (!openData.message) {
    for (let proposal of openData.value) {
      const userVote = await vote.getVote(user.id, proposal.id);
      const hasVoted = userVote.length > 0 && userVote[0].result !== null ? true : false;
      proposal.vote = hasVoted
    };
  }
  response.send(openData)
};

// Export
module.exports = proposalFetcher
