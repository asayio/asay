// Read .env file
const environment = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `./.env.${environment}` });

// Load error logging
if (environment === 'production') {
  const Rollbar = require('rollbar');
  const rollbar = new Rollbar({
    accessToken: process.env.ROLLBAR,
    captureUncaught: true,
    captureUnhandledRejections: true
  });
}

// Import
const routes = require('./src/routes.js');

// Variables
const express = require('express');
const port = 3001; // Note: must match port of the "proxy" URL in app/package.json
const app = express();

const bodyParser = require('body-parser');
const formidable = require('express-formidable');
app.use(bodyParser.json());
app.use(formidable());
routes.map(app);

const path = require('path');
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
    ftBatchFetcher(); // initial load
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
