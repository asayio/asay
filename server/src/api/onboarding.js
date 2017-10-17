// Import
const changeUserOnboarding = require('../db/user/changeUserOnboarding')

// Function
async function postUserOnboarding (request, response) {
  try {
    const user = await auth.getUser(request);
    if (user) {
      const userId = user.id;
      await changeUserOnboarding(userId)
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
module.exports = postUserOnboarding
