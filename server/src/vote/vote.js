// Import
const db = require('../../db.js')
const auth = require('../auth/auth.js')

// Queries
const selectVote = db.sql('./src/vote/selectVote.sql')
const insertVote = db.sql('./src/vote/insertVote.sql')
const updateVote = db.sql('./src/vote/updateVote.sql')

// Functions
async function voteChecker (userId, proposalId) {
  const vote = await getVote(userId, proposalId)
  return vote.length > 0 ? true : false;
}

async function getVote (userId, proposalId) {
  const vote = await db.cx.query(selectVote,
    {
      user: userId,
      proposal: proposalId,
    });
  return vote
}

async function postVote (request, response) {

  try {

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

  catch(err) {
    console.log(err);
    response.sendStatus(500)
  }
}

// Export
module.exports = {
  postVote,
  getVote
}
