// Import
const createProject = require('../db/project/createProject');
const createProjectHistory = require('../db/project/createProjectHistory');
const getProjectHistory = require('../db/project/getProjectHistory');
const changeProject = require('../db/project/changeProject');
const getUser = require('../logic/getUser');

//Functions
async function projectPostHandler(request, response) {
  try {
    const user = await getUser(request);
    if (user) {
      const project = request.body;
      if (project.id) {
        const projectPrevious = await getProjectHistory(project.id);
        if (projectPrevious.initiator === user.id) {
          const version = projectPrevious.version + 1;
          await changeProject(project, version);
          await createProjectHistory(project.id, project, version);
          response.send({ id: project.id });
        } else {
          response.sendStatus(401);
        }
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
