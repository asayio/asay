// Import
const db = require('../../db.js')
const auth = require('../auth/auth.js')

// Queries
const selectCategoryPreferences = db.sql('./src/preferences/selectCategoryPreferences.sql')
const selectCategoryPreference = db.sql('./src/preferences/selectCategoryPreference.sql')
const insertCategoryPreference = db.sql('./src/preferences/insertCategoryPreference.sql')
const updateCategoryPreference = db.sql('./src/preferences/updateCategoryPreference.sql')

// Functions
async function getCategoryPreferences (request, response) {
  try {
    const user = await auth.lookupUser(request.headers.authtoken);
    if (user) {
      const userId = user.id;
      const categoryPreferences = await db.cx.query(selectCategoryPreferences,
        {
          user: userId,
        }
      );
      response.send(categoryPreferences)
    } else {
      response.sendStatus(401)
    }
  }
  catch(err) {
    response.sendStatus(500)
  }
}

async function getCategoryPreference (userId, categoryId) {
  const preference = await db.cx.query(selectCategoryPreference,
    {
      user: userId,
      category: categoryId,
    });
  return preference
}

async function postCategoryPreference (request, response) {
  try {
    const authToken = await auth.getToken(request);
    const user = await auth.lookupUser(authToken);
    if (user) {
      const userId = user.id;
      const preference = request.body.preference;
      const categoryId = request.body.id;
      const currentPreference = await getCategoryPreference(userId, categoryId);
      const hasPreference = currentPreference.length > 0 ? true : false;
      const setPreference = hasPreference ? await db.cx.query(updateCategoryPreference,
        {
          user: userId,
          category: categoryId,
          preference: preference,
        }) : db.cx.query(insertCategoryPreference,
        {
          user: userId,
          category: categoryId,
          preference: preference,
        });
      response.sendStatus(200)
    } else {
      response.sendStatus(401)
    }
  }

  catch(err) {
    console.log(err);
    response.sendStatus(500)
  }
}

// Export
module.exports = {
  getCategoryPreferences,
  postCategoryPreference
}
