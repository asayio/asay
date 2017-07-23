// Import
const db = require('../../../db.js')

// Queries
const selectVote = db.sql('./src/article/vote/selectArticleVote.sql')
const insertVote = db.sql('./src/article/vote/insertArticleVote.sql')
const updateVote = db.sql('./src/article/vote/updateArticleVote.sql')

// Functions
async function voteChecker (user, article) {
  const vote = await db.cx.query(selectVote,
    {
      user: user,
      article: article,
    });
  return vote.length > 0 ? true : false;
}

async function postVote (request, response) {
  // Variables
  const article = request.params.id
  const user = 1 // collect through auth ...
  const voteresult = request.body.voteresult

  // Functions
  const hasVoted = await voteChecker(user, article)
  const vote = hasVoted ? await db.cx.query(updateVote,
    {
      user: user,
      article: article,
      result: voteresult,
    }) : db.cx.query(insertVote,
    {
      user: user,
      article: article,
      result: voteresult,
    });
  response.sendStatus(200)
}

// Export
module.exports = {
  postVote
}
