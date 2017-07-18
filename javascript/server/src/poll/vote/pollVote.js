// Import
const db = require('../../../db.js')

// Queries
const selectVote = db.sql('./src/poll/vote/selectPollVote.sql')
const insertVote = db.sql('./src/poll/vote/insertPollVote.sql')
const updateVote = db.sql('./src/poll/vote/updatePollVote.sql')

// Functions
async function voteChecker (userId, proposalid) {
  const vote = await db.cx.query(selectVote,
    {
      user: userId,
      proposal: proposalid,
    });
  return vote.length > 0 ? true : false;
}

async function postVote (request, response) {
  // Variables
  const proposalid = request.params.id
  const userId = 1 // collect through auth ...
  const voteResult = request.body.voteresult

  // Functions
  const hasVoted = await voteChecker(userId, proposalid)
  const vote = hasVoted ? await db.cx.query(updateVote,
    {
      user: userId,
      proposal: proposalid,
      result: voteResult,
    }) : db.cx.query(insertVote,
    {
      user: userId,
      proposal: proposalid,
      result: voteResult,
    });
  response.sendStatus(200)
}

// Export
module.exports = {
  postVote
}
