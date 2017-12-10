// Import
const changeUserEmailNotification = require('../db/user/changeUserEmailNotification');
const getUser = require('../logic/getUser');

// Function
async function postUserEmailNotification(request, response) {
  try {
    const user = await getUser(request);
    if (user) {
      const userId = user.id;
      const emailnotification = request.body.emailnotification;
      await changeUserEmailNotification(userId, emailnotification);
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
module.exports = postUserEmailNotification;
