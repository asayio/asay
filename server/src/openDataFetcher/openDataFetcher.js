// Import
const fetch = require('node-fetch');
const auth = require('../auth/auth.js');
const vote = require('../vote/vote.js');

// Functions
async function fetchOnePage (request, response) {
  const authToken = await auth.getToken(request);
  const user = await auth.lookupUser(authToken);
  const url = 'http://oda.ft.dk/api/' + request.params.searchCriteria;
  const openData = await fetchOpenData(url);
  if (!openData.message) {
    for (let proposal of openData.value) {
      const userVote = await vote.getVote(user.id, proposal.id);
      const hasVoted = userVote.length > 0 && userVote[0].result !== null ? true : false;
      proposal.vote = hasVoted
    };
  }
  response.send(openData)
}

async function fetchOpenData (searchCriteria) {
  const openData = await fetch(searchCriteria).then(function (data) {
    return data.json();
  }).catch(function(reason) {
    return reason
  });
  return openData;
}

async function fetchNextPage (nextPageUrl, page) {
  console.log(nextPageUrl);
  const nextPage = await fetchOpenData(nextPageUrl);
  if (await nextPage.message) {
    return await nextPage;
  }
  var pages = await page.concat(nextPage.value);
  if (await nextPage['odata.nextLink']) {
    return fetchNextPage(nextPage['odata.nextLink'], pages)
  } else {
    return await pages;
  }
}

async function fetchAllPages (request, response) {
  var allPages = await fetchNextPage('http://oda.ft.dk/api/' + request.params.searchCriteria, []);
  response.send(allPages)
}

// Export
module.exports = {
  fetchOnePage: fetchOnePage,
  fetchAllPages: fetchAllPages
}
