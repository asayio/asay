// Import
const db = require('../../../db.js')

// Queries
const selectVote = db.sql('./src/poll/vote/selectPollVote.sql')
const insertVote = db.sql('./src/poll/vote/insertPollVote.sql')
const updateVote = db.sql('./src/poll/vote/updatePollVote.sql')

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
  const pollId = request.params.id
  const userId = 1 // collect through auth ...
  const voteResult = request.body.userVote

  // Functions
  const hasVoted = await voteChecker(userId, pollId)
  console.log(hasVoted);
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
