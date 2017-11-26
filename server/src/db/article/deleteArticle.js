// Import
const db = require('../db')
const deleteArticleSql = db.sql('./article/sql/deleteArticle.sql')

// Functions
async function deleteArticle(proposalId, articleId) {
  const payload = await db.cx.query(deleteArticleSql, { proposalId, articleId })
  return payload
}

// Export
module.exports = deleteArticle
