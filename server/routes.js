// Variables
const ftScraper = require('./src/ftScraper/ftScraper')
const openDataFetcher = require('./src/openDataFetcher/openDataFetcher')
const auth = require('./src/auth/auth');
const vote = require('./src/vote/vote');
const preferences = require('./src/preferences/preferences')
const user = require('./src/user/user')


// Routes
function map(app) {
  // GET
  app.get("/api/ftScraper/", ftScraper.ftScraper);
  app.get("/api/openDataFetcher/fetchOnePage/:searchCriteria", openDataFetcher.fetchOnePage);
  app.get("/api/openDataFetcher/fetchAllPages/:searchCriteria", openDataFetcher.fetchAllPages);
  app.get("/api/auth/:authToken", auth.loginPostHandler);
  app.get("/api/preferences/categories", preferences.getCategoryPreferences);
  app.get("/api/vote/history", vote.getVoteHistory);

  // POST
  app.post("/api/proposal/:id/vote", vote.postVote);
  app.post("/api/preferences/categories", preferences.postCategoryPreference);
  app.post("/api/user/terms", user.postTermsAccept);
}

// Export
module.exports = {
  map
}
