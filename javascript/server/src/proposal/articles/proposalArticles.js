// Import
const db = require('../../../db.js');

// Queries
const selectArticles = db.sql('./src/proposal/articles/selectProposalArticles.sql');

// Functions
async function getArticles (request, response) {
  const articles = await db.cx.query(selectArticles,
    {
      proposal: 1, // request.body.proposalId
      user: 1 // request.body.userId
    });
  return articles
}

// Export
module.exports = {
  getArticles
}
