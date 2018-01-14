// Import
const changeUserDecleration = require('../db/user/changeUserDecleration');
const getUser = require('../logic/getUser');

// Function
async function postUserDecleration(request, response) {
  try {
    const user = await getUser(request);
    if (user) {
      const userId = user.id;
      await changeUserDecleration(userId);
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
module.exports = postUserDecleration;
