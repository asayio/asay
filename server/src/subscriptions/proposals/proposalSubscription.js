// Import
const db = require('../../../db.js')
const auth = require('../../auth/auth.js')

// Queries
const selectVotes = db.sql('./src/subscriptions/proposals/selectProposalSubscriptions.sql')
const selectVote = db.sql('./src/subscriptions/proposals/selectProposalSubscription.sql')
const insertVote = db.sql('./src/subscriptions/proposals/insertProposalSubscription.sql')
const updateVote = db.sql('./src/subscriptions/proposals/updateProposalSubscription.sql')

// Functions
async function getProposalSubscriptions (userId) {
  const vote = await db.cx.query(selectVotes,
    {
      user: userId,
    });
  return vote
}

async function getProposalSubscription (userId, proposalId) {
  const vote = await db.cx.query(selectVote,
    {
      user: userId,
      proposal: proposalId,
    });
  return vote
}

async function postProposalSubscription (request, response) {
  try {
    const user = await auth.getUser(request);
    if (user) {
      const userId = user.id;
      const subscription = request.body.subscription;
      const proposalId = request.params.id;
      const currentSubscription = await getProposalSubscription(userId, proposalId);
      const hasSubscription = currentSubscription.length > 0 ? true : false;
      hasSubscription ? await db.cx.query(updateVote,
        {
          user: userId,
          proposal: proposalId,
          subscription: subscription,
        }) : db.cx.query(insertVote,
        {
          user: userId,
          proposal: proposalId,
          subscription: subscription,
        });
      response.sendStatus(200)
    } else {
      response.sendStatus(401)
    }
  }
  catch(err) {
    response.sendStatus(500)
  }
}

// Export
module.exports = {
  postProposalSubscription,
  getProposalSubscription,
  getProposalSubscriptions
}
