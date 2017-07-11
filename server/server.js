require('dotenv').config(); // https://www.npmjs.com/package/dotenv
const express = require('express'); // https://www.npmjs.com/package/express
const pgp = require('pg-promise')(); // https://www.npmjs.com/package/pg-promise

const db = pgp(process.env.DATABASE); // Note: connect to database
const port = 3001; // Note: must match port of the "proxy" URL in app/package.json

const app = express(); // Note: create express application instance

async function dreamsGetHandler (request, response) {
  const rowList = await db.query('select * from dream');
  const dreamList = rowList.map(row => row.title);
  response.send(dreamList);
}
app.get("/api/dreams", dreamsGetHandler); // Note: register express route

function listeningHandler () {
  console.log(`Server is listening on port ${port}`);
}
app.listen(port, listeningHandler); // Note: start express application
