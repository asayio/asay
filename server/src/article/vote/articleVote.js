// Import
const db = require('../../../db.js');
const auth = require('../../auth/auth.js');

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

  const authToken = await auth.getToken(request);
  const user = await auth.lookupUser(authToken);

  if (user) {

    const userId = user.id
    const article = request.params.id
    const voteresult = request.body.voteresult
    const hasVoted = await voteChecker(userId, article)

    const vote = hasVoted ? await db.cx.query(updateVote,
      {
        user: userId,
        article: article,
        result: voteresult,
      }) : db.cx.query(insertVote,
      {
        user: userId,
        article: article,
        result: voteresult,
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
