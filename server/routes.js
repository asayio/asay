// Variables
const ftScraper = require('./src/ftScraper')
const proposalFetcher = require('./src/openData/proposalFetcher')
const stageFetcher = require('./src/openData/stageFetcher')
const filterFetcher = require('./src/openData/filterFetcher')
const auth = require('./src/auth/auth')
const vote = require('./src/vote/vote')
const preferences = require('./src/preferences/preferences')
const user = require('./src/user/user')


// Routes
function map(app) {
  // GET
  app.get("/api/ftScraper/", ftScraper.ftScraper)
  app.get("/api/auth/:authToken", auth.loginPostHandler)
  app.get("/api/openData/filterFetcher/", filterFetcher)
  app.get("/api/preferences/categories", preferences.getCategoryPreferences)

  // POST
  app.post("/api/proposal/:id/vote", vote.postVote)
  app.post("/api/openData/proposalFetcher/", proposalFetcher)
  app.post("/api/openData/stageFetcher/", stageFetcher)
  app.post("/api/preferences/categories", preferences.postCategoryPreference);
  app.post("/api/user/terms", user.postTermsAccept)
}

// Export
module.exports = {
  map
}
