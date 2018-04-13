// Import
const fetch = require('node-fetch');

// Functions
async function fetchOnePage (url) {
  const openData = await fetchOpenData(url);
  return openData
}

async function fetchOpenData (url) {
  try {
    const openDataResponse = await fetch(url);
    const openData = await openDataResponse.json();
    return openData;
  } catch (error) {
    return error;
  }
}

async function fetchNextPage (nextPageUrl, page) {
  const nextPage = await fetchOpenData(nextPageUrl);
  if (await nextPage.message) {
    return await nextPage;
  }
  var pages = await page.concat(nextPage.value);
  if (await nextPage['odata.nextLink']) {
    return fetchNextPage(nextPage['odata.nextLink'], pages)
  } else {
    return await pages
  }
}

async function fetchAllPages (url) {
  var allPages = await fetchNextPage(url, []);
  return allPages
}

// Export
module.exports = {
  fetchOnePage: fetchOnePage,
  fetchAllPages: fetchAllPages
}
