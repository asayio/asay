// Import
const db = require('../db')
const updateArticleSql = db.sql('./article/sql/updateArticle.sql')

// Functions
async function updateArticle(proposalId, articleId, requestBody) {
  const sqlData = Object.assign({}, { proposalId, articleId }, requestBody)
  const payload = await db.cx.query(updateArticleSql, sqlData)
  return payload
}

// Export
module.exports = updateArticle
