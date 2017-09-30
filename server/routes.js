// Variables
// const lists = require('./src/lists/lists');
const ftScraper = require('./src/ftScraper/ftScraper')
const openDataFetcher = require('./src/openDataFetcher/openDataFetcher')
const auth = require('./src/auth/auth');
const proposals = require('./src/proposals/proposals')
const vote = require('./src/vote/vote');
const preferences = require('./src/preferences/preferences')
// const proposal = require('./src/proposal/proposal')
// const pollVote = require('./src/poll/vote/pollVote')
// const article = require('./src/article/article');
// const articleVote = require('./src/article/vote/articleVote')

// Routes
function map(app) {
  // GET
  // app.get("/api/lists", lists.getLists);
  app.get("/api/ftScraper/", ftScraper.ftScraper);
  app.get("/api/openDataFetcher/fetchOnePage/:searchCriteria", openDataFetcher.fetchOnePage);
  app.get("/api/openDataFetcher/fetchAllPages/:searchCriteria", openDataFetcher.fetchAllPages);
  app.get("/api/proposals/getProposals/:searchCriteria", proposals.getProposals);
  app.get("/api/proposals/getOpenDataCaseType", proposals.getOpenDataCaseType);
  app.get("/api/proposals/getOpenDataPeriod", proposals.getOpenDataPeriod);
  // app.get("/api/proposal/:id", proposal.getProposalBundle);
  app.get("/api/auth/:authToken", auth.loginPostHandler);
  app.get("/api/preferences/categories", preferences.getCategoryPreferences);

  // POST
  app.post("/api/proposal/:id/vote", vote.postVote);
  app.post("/api/preferences/categories", preferences.postCategoryPreference);
  // app.post("/api/article/:id", article.postArticle);
  // app.post("/api/article/:id/vote", articleVote.postVote);
}

// Export
module.exports = {
  map
}
