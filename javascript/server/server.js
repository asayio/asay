// Read .env file
require('dotenv').config();

// Import
const auth = require('./src/auth/auth.js');

// Variables
const express = require('express');
const port = 3001; // Note: must match port of the "proxy" URL in app/package.json
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.json())

auth.map(app);

app.use(express.static('app')); // Note: serve app as static assets
app.get("/", function (request, response) { // Note: redirect root URL to index.html in app
  response.sendFile(__dirname + '/app/index.html');
});

// Initate webserver
function listeningHandler () {
  console.log(`Server is listening on port ${port}`);
}
app.listen(port, listeningHandler);
