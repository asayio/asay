// Import
const lookupVote = require('../db/vote/lookupVote')
const changeVote = require('../db/vote/changeVote')
const createVote = require('../db/vote/createVote')
const getUser =  require('../logic/getUser')

// Function
async function postVote (request, response) {
  try {
    const user = await getUser(request);
    if (user) {
      const userId = user.id;
      const voteResult = request.body.voteresult;
      const proposalId = request.params.id;
      const currentVote = await lookupVote(userId, proposalId);
      const hasVoted = currentVote.length > 0 ? true : false;
      const vote = hasVoted ?
        changeVote(userId, proposalId, voteResult)
        : createVote(userId, proposalId, voteResult)
      response.sendStatus(200)
    } else {
      response.sendStatus(401)
    }
  }
  catch(err) {
    response.sendStatus(500)
    console.log(err);
  }
}

// Export
module.exports = postVote
