// Read .env file
require('dotenv').config();

// Import
const routes = require('./routes.js');

// Variables
const express = require('express');
const port = 3001; // Note: must match port of the "proxy" URL in app/package.json
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.json())

routes.map(app);

const path = require('path')
app.use(express.static('app')); // Note: serve app as static assets
app.get('*', function (request, response) {
  response.sendFile(path.join(__dirname, './app/index.html'));
})

// Initate webserver
function listeningHandler () {
  console.log(`Server is listening on port ${port}`);
}
app.listen(port, listeningHandler);
