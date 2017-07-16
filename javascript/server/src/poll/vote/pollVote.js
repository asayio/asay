// Import
const db = require('../../../db.js')

// Queries
const selectVote = db.sql('./sql/selectVote.sql')
const insertVote = db.sql('./sql/insertVote.sql')
const updateVote = db.sql('./sql/updateVote.sql')

// Functions
async function voteChecker (userId, pollId) {
  const vote = await db.cx.query(selectVote,
    {
      user: userId,
      poll: pollId,
    });
  return vote.length > 0 ? true : false;
}

async function postVote (request, response) {
  // Variables
  const pollId = request.body.pollId
  const userId = 1 // collect through auth ...
  const voteResult = request.body.userVote

  // Functions
  const hasVoted = await voteChecker(userId, pollId)
  const vote = hasVoted ? await db.cx.query(updateVote,
    {
      user: userId,
      poll: pollId,
      result: voteResult,
    }) : db.cx.query(insertVote,
    {
      user: userId,
      poll: pollId,
      result: voteResult,
    });
  response.sendStatus(200)
}

// Export
module.exports = {
  postVote
}
