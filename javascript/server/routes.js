// Variables
const lists = require('./src/lists/lists');
const auth = require('./src/auth/auth');
const proposals = require('./src/proposals/proposals')
const proposal = require('./src/proposal/proposal')
const pollVote = require('./src/poll/vote/pollVote')
const article = require('./src/article/article');
const articleVote = require('./src/article/vote/articleVote')

// Routes
function map(app) {
  // GET
  app.get("/api/lists", lists.getLists);
  app.get("/api/proposals", proposals.getProposals);
  app.get("/api/proposal/:id", proposal.getProposalBundle);

  // POST
  app.post("/api/auth", auth.loginPostHandler);
  app.post("/api/proposal/:id/vote", pollVote.postVote);
  app.post("/api/article/:id", article.postArticle);
  app.post("/api/article/:id/vote", articleVote.postVote);
}

// Export
module.exports = {
  map
}
