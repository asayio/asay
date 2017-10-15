// Import
const getUser = require('../logic/getUser')
const lookupPreference = require('../db/preference/lookupPreference')
const changePreference = require('../db/preference/changePreference')
const createPreference = require('../db/preference/createPreference')

async function postPreferenceHandler (request, response) {
  try {
    const user = await getUser(request);
    if (user) {
      const userId = user.id;
      const preference = request.body.preference;
      const categoryId = request.body.id;
      const currentPreference = await lookupPreference(userId, categoryId);
      const hasPreference = currentPreference.length > 0 ? true : false;
      const setPreference = hasPreference ?
        changePreference(userId, categoryId, preference)
        : createPreference(userId, categoryId, preference)
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
module.exports = postPreferenceHandler
