// Import
const createProject = require('../db/project/createProject');
const changeProject = require('../db/project/changeProject');
const getUser = require('../logic/getUser');

//Functions
async function projectPostHandler(request, response) {
  try {
    const user = await getUser(request);
    if (user) {
      project = request.body;
      if (project.id) {
        changeProject(project);
        response.sendStatus(200);
      } else {
        const newProject = await createProject(user, project);
        response.send(newProject);
      }
    } else {
      response.sendStatus(401);
    }
  } catch (err) {
    response.sendStatus(500);
    console.log(err);
  }
}

// Export
module.exports = projectPostHandler;
