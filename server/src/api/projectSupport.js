// Import
const lookupProjectSupport = require('../db/projectSupport/lookupProjectSupport');
const changeProjectSupport = require('../db/projectSupport/changeProjectSupport');
const createProjectSupport = require('../db/projectSupport/createProjectSupport');
const getUser = require('../logic/getUser');

// Function
async function postProjectSupport(request, response) {
  try {
    const user = await getUser(request);
    if (user) {
      const userId = user.id;
      const support = request.body.support;
      const projectId = request.params.id;
      console.log(request.params.id);
      const currentProjectSupport = await lookupProjectSupport(userId, projectId);
      const hasProjectSupport = currentProjectSupport.length > 0 ? true : false;
      if (hasProjectSupport) {
        changeProjectSupport(userId, projectId, support);
      } else {
        createProjectSupport(userId, projectId, support);
      }
      response.sendStatus(200);
    } else {
      response.sendStatus(401);
    }
  } catch (err) {
    response.sendStatus(500);
    console.log(err);
  }
}

// Export
module.exports = postProjectSupport;
