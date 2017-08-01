// Import
const db = require('../../../db.js');
const ogs = require('open-graph-scraper');

// Queries
const selectArticles = db.sql('./src/proposal/articles/selectProposalArticles.sql');

// Functions
async function getArticles (proposalId, userId) {
  const articles = await db.cx.query(selectArticles,
    {
      proposal: proposalId,
      user: userId,
    });

  const scrapingArticles = await articles.map( async (article) => {
    const options = {
      'timeout': 10000,
      'url': article.linkurl
    };

    return Object.assign(article, await ogs(options));
  })

  return await Promise.all(scrapingArticles).then(result => {
    console.log(result);
    return result;
  })
}

// Export
module.exports = {
  getArticles
}
