// Variables
const proposalBatchFetcher = require('./src/openData/proposalBatchFetcher')
const auth = require('./src/auth/auth')
const vote = require('./src/vote/vote')
const preferences = require('./src/preferences/preferences')
const user = require('./src/user/user')
const proposalSubscriptions = require('./src/subscriptions/proposals/proposalSubscription')
const appData = require('./src/appDataBundleFetcher')


// Routes
function map(app) {
  // GET
  app.get("/api/openData/proposalFetcher/", proposalBatchFetcher)
  app.get("/api/auth/:authToken", auth.loginPostHandler)
  app.get("/api/preferences/categories", preferences.getCategoryPreferences)
  app.get("/api/appDataBundle", appData.appDataBundleFetcher)

  // POST
  app.post("/api/proposal/:id/vote", vote.postVote)
  app.post("/api/preferences/categories", preferences.postCategoryPreference);
  app.post("/api/user/terms", user.postTermsAccept)
  app.post("/api/subscription/proposal/:id", proposalSubscriptions.postProposalSubscription)
}

// Export
module.exports = {
  map
}
