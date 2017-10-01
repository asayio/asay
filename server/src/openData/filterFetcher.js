// Import
const openDataFetcher = require('./openDataFetcher.js');

// Functions
async function filterFetcher (request, response) {
  // const caseTypeFilter = encodeURIComponent('Sagstype');
  // const openDataCaseTypeResponse = await fetch(`/api/openDataFetcher/fetchAllPages/${caseTypeFilter}`);
  // const openDataCaseTypeAll = await openDataCaseTypeResponse.json();
  // const openDataCaseType = openDataCaseTypeAll.filter(function(type) {
  //   return type.id === 3 || type.id === 5
  // })
  // this.setState({openDataCaseType});
  //
  // const periodFilter = encodeURIComponent(`Periode?$inlinecount=allpages&$filter=type%20eq%20'samling'`);
  // const openDataPeriodResponse = await fetch(`/api/openDataFetcher/fetchAllPages/${periodFilter}`);
  // const openDataPeriodAll = await openDataPeriodResponse.json();
  // openDataPeriodAll.sort(function(b, a) {
  //   return a.kode.localeCompare(b.kode)
  // })
  // const openDataPeriod = openDataPeriodAll.filter(function(period) {
  //   return period.id >= 144 //session: 2016-17
  // })
  // this.setState({openDataPeriod});
  //
  // const statusFilter = encodeURIComponent('Sagsstatus');
  // const openDataStatusResponse = await fetch(`/api/openDataFetcher/fetchAllPages/${statusFilter}`);
  // const openDataStatus = await openDataStatusResponse.json();
  // this.setState({openDataStatus});
  // const openData = await openDataFetcher.fetchOnePage(url);
  // response.send(openData)
};

// Export
module.exports = filterFetcher
