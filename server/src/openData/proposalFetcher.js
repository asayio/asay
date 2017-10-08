// Import
const R = require('ramda')
const auth = require('../auth/auth.js')
const openDataFetcher = require('./openDataFetcher.js')
const vote = require('../vote/vote.js')

// Functions
async function proposalFetcher (request, response) {
  const user = await auth.getUser(request);
  const selectedSection = request.body.selectedSection
  const page = request.body.page
  const specificProposalId = request.body.specificProposalId
  let proposalIdList = []
  let filterString = '&$filter=';
  if (selectedSection === 'alle forslag') {
    filterString += 'periodeid eq 144 and (typeid eq 3 or typeid eq 5)'
  } else if (selectedSection === 'udvalgte forslag') {
    proposalIdList = [
      '70703', // L69
      '72432', // L153
      '73014', // L195
      '71402', // B41
      '73286', // B132
      '71644', // B54
      '72745', // B117
      '71731', // B121
      '72732'  // B110
    ];
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
  const filter = 'Sag?$orderby=id desc&$expand=Sagsstatus,Periode,Sagstype' + filterString;
  const url = 'http://oda.ft.dk/api/' + filter
  const openData = await openDataFetcher.fetchOnePage(url);
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
