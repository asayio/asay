// Import
const db = require('../../db.js')

// Queries
const insertArticle = db.sql('./src/article/insertArticle.sql')

// Functions
async function postArticle (request, response) {
  // Variables
  const userId = 1 // collect through auth ...

  // Functions
  const vote = await db.cx.query(insertArticle,
    {
      article: request.body.article,
      proposal: request.params.id,
    });
  response.sendStatus(200)
}

// Export
module.exports = {
  postArticle
}
