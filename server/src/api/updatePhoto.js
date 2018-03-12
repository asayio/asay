// Import
const getUser = require('../logic/getUser');
const contentful = require('../integrations/contentful');

// Function
async function updatePhoto(request, response) {
  try {
    const user = await getUser(request);
    const image = request.files.image;
    if (user && image) {
      const userId = user.id;
      await contentful.uploadImage(image, user)
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
module.exports = updatePhoto;
