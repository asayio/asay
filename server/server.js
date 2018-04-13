// Import
const os = require('os')
const routes = require('./src/routes.js');
const bodyParser = require('body-parser');
const formDataParser = require('./src/middleware/formDataParser')
const express = require('express');
const Rollbar = require('rollbar');
const path = require('path');

// Read .env file
const environment = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `./.env.${environment}` });

// Load error logging
if (environment === 'production') {
  const rollbar = new Rollbar({
    accessToken: process.env.ROLLBAR,
    captureUncaught: true,
    captureUnhandledRejections: true
  });
}

// Variables
const port = 3001; // Note: must match port of the "proxy" URL in app/package.json
const app = express();

app.use(bodyParser.json());
app.use(formDataParser)

routes.map(app);

app.use(express.static('app')); // Note: serve app as static assets

app.get('*', function(request, response) {
  response.sendFile(path.join(__dirname, './app/index.html'));
});

// Initate webserver
function listeningHandler() {
  console.log(`Server is listening on port ${port}. Environment set to ${environment}.`);
  const ftBatchFetcher = require('./src/integrations/ft/ftBatchFetcher');
  const mailBatcher = require('./src/mail/mailBatch');
  const schedule = require('node-schedule');
  if (environment === 'production') {
    schedule.scheduleJob('0 0 10 * * 2', () => {
      console.log('running weekly email batch job');
      mailBatcher('weekly');
    });
    schedule.scheduleJob('0 0 0 1 * *', () => {
      console.log('running monthly email batch job');
      mailBatcher('monthly');
    });
    schedule.scheduleJob('0 0 0 * * *', () => {
      ftBatchFetcher();
    });
  }
}
app.listen(port, listeningHandler);
