// Import
const db = require('../../db.js');

// Queries
const selectSessions = db.sql('./src/lists/sessions/selectSessions.sql');
const selectStatus = db.sql('./src/lists/status/selectStatus.sql');
const selectTags = db.sql('./src/lists/tags/selectTags.sql');
const selectTypes = db.sql('./src/lists/types/selectTypes.sql');

// Functions
async function getLists (request, response) {
  const sessions = await db.cx.query(selectSessions);
  const status = await db.cx.query(selectStatus);
  const tags = await db.cx.query(selectTags);
  const types = await db.cx.query(selectTypes);
  const lists = [{name: "session", options: sessions}, {name: "status", options: status}, {name: "tag", options: tags}, {name: "type", options: types}]
  response.send(lists);
}

// Export
module.exports = {
  getLists
}
