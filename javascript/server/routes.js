// Variables
const lists = require('./src/lists/lists.js');
const auth = require('./src/auth/auth.js');
const proposals = require('./src/proposals/proposals.js')
const proposal = require('./src/proposal/proposal.js')
const pollVote = require('./src/poll/vote/pollVote.js')
const article = require('./src/article/article.js');

// Routes
function map(app) {
  // GET
  app.get("/api/lists", lists.getLists);
  app.get("/api/proposals", proposals.getProposals);
  app.get("/api/proposal/:id", proposal.getProposalBundle);

  // POST
  app.post("/api/auth", auth.loginPostHandler);
  app.post("/api/proposal/:id/vote", pollVote.postVote)
  app.post("/api/article/:id", article.postArticle)
}

// Export
module.exports = {
  map
}
