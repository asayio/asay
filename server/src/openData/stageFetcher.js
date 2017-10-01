// Import
const openDataFetcher = require('./openDataFetcher.js')

// Functions
async function stageFetcher (request, response) {
  const filter = 'Sag(' + request.body.specificProposalId + ')/Sagstrin?$filter=typeid%20eq%207%20or%20typeid%20eq%2017';
  const url = 'http://oda.ft.dk/api/' + filter
  const openData = await openDataFetcher.fetchOnePage(url);
  response.send(openData)
};

// Export
module.exports = stageFetcher
