// Import
const createProject = require('../db/project/createProject');
const createProjectHistory = require('../db/project/createProjectHistory');
const getProjectHistoryVersion = require('../db/project/getProjectHistoryVersion');
const changeProject = require('../db/project/changeProject');
const getUser = require('../logic/getUser');

//Functions
async function projectPostHandler(request, response) {
  try {
    const user = await getUser(request);
    if (user) {
      project = request.body;
      if (project.id) {
        const projectVersionPrevious = await getProjectHistoryVersion(project.id);
        const projectVersion = projectVersionPrevious + 1;
        await changeProject(project, projectVersion);
        await createProjectHistory(project.id, project, projectVersion);
        response.send({ id: project.id });
      } else {
        const newProject = await createProject(user, project);
        const newProjectHistory = await createProjectHistory(newProject.id, project, 1);
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
