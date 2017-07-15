// Variables
const lists = require('./src/lists/lists.js');
const auth = require('./src/auth/auth.js');
const proposals = require('./src/proposals/proposals.js')
const proposal = require('./src/proposal/proposal.js')

// Routes
function map(app) {
  // GET
  app.get("/api/lists", lists.getLists);
  app.get("/api/proposals", proposals.getProposals);
  app.get("/api/proposal", proposal.getProposalBundle);

  // POST
  app.post("/api/auth", auth.lookupUser);
}

// Export
module.exports = {
  map
}
