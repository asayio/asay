// Import
const db = require('../db');
const selectVoteList = db.sql('./vote/sql/selectVoteList.sql');

// Functions
async function getVoteList(userId) {
  const voteList = await db.cx.query(selectVoteList, {
    user: userId
  });
  return voteList;
}

// Export
module.exports = getVoteList;
