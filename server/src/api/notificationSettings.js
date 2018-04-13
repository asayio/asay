// Import
const changeUserEmailNotification = require('../db/user/changeUserEmailNotification');
const changeUserResultNotification = require('../db/user/changeUserResultNotification');
const getUser = require('../logic/getUser');

// Function
async function notificationSettings(request, response) {
  try {
    const user = await getUser(request);
    if (user) {
      const userId = user.id;
      const notificationType = request.body.notificationType
      const value = request.body.value;
      notificationType === 'emailnotification' && await changeUserEmailNotification(userId, value);
      notificationType === 'resultnotification' && await changeUserResultNotification(userId, value);
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
module.exports = notificationSettings;
