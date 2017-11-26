// Import
const db = require('../db')
const insertArticleSql = db.sql('./article/sql/insertArticle.sql')

// Functions
async function createArticle(proposalId, userId, sourceUrl, articleUrl) {
  const articleSource = await db.cx.query(insertArticleSourceSql, { url: sourceUrl })
  const articleItem = await db.cx.query(insertArticleItemSql, {
    articleSourceId: articleSource.id,
    description: '',
    headline: '',
    image: '',
    url: articleUrl
  })
  const articleSubmission = await db.cx.query(insertArticleSubmissionSql, {
    articleItemId: articleItem.id,
    proposalId,
    status: 'pending',
    userId
  })
  return payload
}

// Export
module.exports = createArticle
