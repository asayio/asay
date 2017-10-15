// Import
const R = require('ramda')
const auth = require('../auth/auth.js')
const openDataFetcher = require('./openDataFetcher.js')
const vote = require('../vote/vote.js')
const committee = require('../preferences/preferences.js')

// Functions
async function openDataBatchFetcher (request, response) {
  const proposalExpand = '&$expand=Sagsstatus,Periode,Sagstype,SagAkt%C3%B8r,Sagstrin'
  const proposalFilter = '&$filter=(typeid eq 3 or typeid eq 5) and periodeid eq 144'
  const proposalUrl = 'http://oda.ft.dk/api/Sag?$orderby=id desc' + proposalExpand + proposalFilter
  const proposalList = await openDataFetcher.fetchAllPages(proposalUrl)
  const formattedProposalList = proposalList.map(proposal => {
    return {
      id: proposal.id,
      info: {
        committeeId: R.find(R.propEq('rolleid', 11), proposal.SagAktør).aktørid,
        titel: proposal.titel,
        shortTitel: proposal.titelkort,
        type: proposal.Sagstype.type,
        resume: proposal.resume,
        number: proposal.nummer,
        numberPreFix: proposal.nummerprefix,
        numberNumeric: proposal.nummernumerisk,
        numberPostFix: proposal.nummerpostfix,
        statusId: proposal.Sagsstatus.id,
        status: proposal.Sagsstatus.status,
        periodId: proposal.Periode.id,
        periodCode: proposal.Periode.kode,
        period: proposal.Periode.titel,
        stage: proposal.Sagstrin
      }
    }
  })
  response.send(formattedProposalList)
  // save formattedProposalList in db
};
// openDataBatchFetcher() // first time run
// setInterval(openDataBatchFetcher, 24 * 60 * 60) // update every 24hrs

// Export
module.exports = openDataBatchFetcher
