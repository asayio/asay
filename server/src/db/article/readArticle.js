// Import
const db = require('../db')
const selectArticleSql = db.sql('./article/sql/selectArticle.sql')

// Mock
const mock = [
  {
    id: 1,
    status: 'publish',
    headline: 'This is a headline',
    description: 'This is a test',
    url: 'http://www.google.com',
    image: null,
    source: {
      name: 'Berlingske',
      description: 'Berlingske er en dansk avis',
      url: 'http://www.berlingske.dk',
      logo: null
    }
  },
  {
    id: 2,
    status: 'publish',
    headline: 'This is a headline',
    description: 'This is a test',
    url: 'http://www.google.com',
    image: null,
    source: {
      name: 'Berlingske',
      description: 'Berlingske er en dansk avis',
      url: 'http://www.berlingske.dk',
      logo: null
    }
  },
  {
    id: 3,
    status: 'pending',
    headline: 'This is a headline',
    description: 'This is a test',
    url: 'http://www.google.com',
    image: null,
    source: {
      name: 'Berlingske',
      description: 'Berlingske er en dansk avis',
      url: 'http://www.berlingske.dk',
      logo: null
    }
  }
]

// Functions
async function readArticle(proposalId, articleId) {
  return mock
  //const payload = await db.cx.query(selectArticleSql, { proposalId, articleId })
  //return payload
}

// Export
module.exports = readArticle


