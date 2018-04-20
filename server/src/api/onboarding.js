// Import
const changeUserOnboarding = require('../db/user/changeUserOnboarding');
const getUser = require('../logic/getUser');

// Function
async function postUserOnboarding(request, response) {
  try {
    const user = await getUser(request);
    if (user) {
      const userId = user.id;
      const type = request.params.type;
      await changeUserOnboarding(userId, type);
      response.sendStatus(200);
    } else {
      response.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
    response.sendStatus(500);
  }
}

// Export
module.exports = postUserOnboarding;
