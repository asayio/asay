// Import
const onboarding = require('./api/onboarding')
const auth = require('./api/auth')
const vote = require('./api/vote')
const article = require('./api/article')
const preference = require('./api/preference')
const subscription = require('./api/subscription')
const appData = require('./api/appData')

// Routes
function map(app) {
  // GET
  app.get('/api/auth/:authToken', auth)
  app.get('/api/appDataBundle', appData)
  app.get('/api/proposal/:proposalId/article/:articleId*?', article.get)

  // POST
  app.post('/api/proposal/:id/vote', vote)
  app.post('/api/proposal/:id/subscription', subscription)
  app.post('/api/proposal/:propsalId/article', article.post)
  app.post('/api/preference', preference)
  app.post('/api/user/onboarding', onboarding)

  // PUT
  app.put('/api/proposal/:proposalId/article/:articleId', article.put)

  // DELETE
  app.delete('/api/proposal/:proposalId/article/:articleId', article.delete)
}

// Export
module.exports = {
  map
}
