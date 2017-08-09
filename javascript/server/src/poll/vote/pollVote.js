// Import
const db = require('../../../db.js')
const auth = require('../../auth/auth.js')

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

  const authToken = await auth.getToken(request);
  const user = await auth.lookupUser(authToken);

  if (user) {

    const userId = user.id
    const voteResult = request.body.voteresult
    const proposalId = request.params.id
    const hasVoted = await voteChecker(userId, proposalId)

    const vote = hasVoted ? await db.cx.query(updateVote,
      {
        user: userId,
        proposal: proposalId,
        result: voteResult,
      }) : db.cx.query(insertVote,
      {
        user: userId,
        proposal: proposalId,
        result: voteResult,
      });
    response.sendStatus(200)
  } else {
    response.sendStatus(401)
  }
}

// Export
module.exports = {
  postVote
}
