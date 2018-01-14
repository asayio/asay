// Import
const onboarding = require('./api/onboarding');
const email = require('./api/email');
const auth = require('./api/auth');
const vote = require('./api/vote');
const preference = require('./api/preference');
const project = require('./api/project');
const subscription = require('./api/subscription');
const appData = require('./api/appData');
const seen = require('./api/notification');
const projectSupport = require('./api/projectSupport');

// Routes
function map(app) {
  // GET
  app.get('/api/auth/:authToken', auth);
  app.get('/api/appDataBundle', appData);

  // POST
  app.post('/api/proposal/:id/vote', vote);
  app.post('/api/proposal/:id/subscription', subscription);
  app.post('/api/project/:id/edit', project);
  app.post('/api/project/:id/support', projectSupport);
  app.post('/api/preference', preference);
  app.post('/api/user/onboarding', onboarding);
  app.post('/api/user/emailnotification', email);
  app.post('/api/seen/', seen);
}

// Export
module.exports = {
  map
};
