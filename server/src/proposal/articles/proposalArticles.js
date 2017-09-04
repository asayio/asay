// Import
const db = require('../../../db.js');

// Queries
const selectArticles = db.sql('./src/proposal/articles/selectProposalArticles.sql');

// Functions
async function getArticles (proposalId, userId) {
  const articles = await db.cx.query(selectArticles,
    {
      proposal: proposalId,
      user: userId,
    });
  return await articles;
}

// Export
module.exports = {
  getArticles
}
