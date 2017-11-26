// Import
const createArticleDb = require('../db/article/createArticle')
const readArticleDb = require('../db/article/readArticle')
const updateArticleDb = require('../db/article/updateArticle')
const deleteArticleDb = require('../db/article/deleteArticle')
const getUser = require('../logic/getUser')

// Function
async function getArticle(req, res) {
  try {
    const user = await getUser(req)
    const proposalId = req.params.proposalId || null
    const articleId = req.params.articleId || null
    if (user && proposalId) {
      const payload = await readArticleDb(proposalId, articleId)
      res.send(payload)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    res.sendStatus(500)
    console.log(err)
  }
}

async function postArticle(req, res) {
  try {
    const user = await getUser(req)
    const proposalId = req.params.proposalId || null
    const requestBody = req.body || null
    if (user && proposalId && requestBody) {
      const articleUrl = requestBody.url || null
      const articleSource = articleUrl ? findArticleSourceFromArticleUrl(articleUrl) : null
      const payload = await createArticleDb(proposalId, user.id, articleSource, articleUrl)
      res.send(payload)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    res.sendStatus(500)
    console.log(err)
  }
}

async function putArticle(req, res) {
  try {
    const user = await getUser(req)
    const proposalId = req.params.proposalId || null
    const articleId = req.params.articleId || null
    const requestBody = req.body || null
    if (user && proposalId && articleId && requestBody) {
      const payload = await updateArticleDb(proposalId, articleId, requestBody)
      res.send(payload)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    res.sendStatus(500)
    console.log(err)
  }
}

async function deleteArticle(req, res) {
  try {
    const user = await getUser(req)
    const proposalId = req.params.proposalId || null
    const articleId = req.params.articleId || null
    if (user && proposalId && articleId) {
      const payload = await deleteArticleDb(proposalId, articleId)
      res.sendStatus(200)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    res.sendStatus(500)
    console.log(err)
  }
}

// Export
module.exports = {
  get: getArticle,
  post: postArticle,
  put: putArticle,
  delete: deleteArticle
}
