// Import
const fs = require('fs');
const apiKey = process.env.CONTENTFULAPI;
const spaceId = process.env.CONTENTFULSPACE;
const fetch = require('node-fetch');
const request = require('request');
const R = require('ramda');
const contentful = require('contentful-management');

// Functions
async function uploadImage(image, user) {
  const client = contentful.createClient({
    accessToken: apiKey
  });
  const imageBinary = await fs.readFileSync(image.path, function(err, imageBinary) {
    return imageBinary;
  });
  const contentfulResponse = await client
    .getSpace(spaceId)
    .then(space =>
      space.createAssetFromFiles({
        fields: {
          title: {
            'en-US': user.firstname + user.lastname
          },
          description: {
            'en-US': 'profile image for candidate'
          },
          file: {
            'en-US': {
              contentType: 'image/svg+xml',
              fileName: user.firstname + user.lastname + '.jpg',
              file: imageBinary
            }
          }
        }
      })
    )
    .then(asset => asset.processForAllLocales())
    .then(asset => asset.publish())
    .then(asset => asset) // I might have to do another request to get the URL
    .catch(console.error);
  return contentfulResponse.fields.file['en-US'].url;
}

// Export
module.exports = {
  uploadImage
};
