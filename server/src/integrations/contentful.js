// Import
const fs = require('fs')
const apiKey = process.env.CONTENTFUL;
const fetch = require('node-fetch');
const request = require('request')
const R = require('ramda')
const contentful = require('contentful-management')

// Functions
async function uploadImage(image, user) {
  const client = contentful.createClient({
    accessToken: apiKey
  })
  fs.readFile(image.path, function(err, imageBinary) {
    client.getSpace('ihbts236hb1z')
    .then((space) => space.createAssetFromFiles({
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
    }))
    .then((asset) => asset.processForAllLocales())
    .then((asset) => asset.publish())
    .then((asset) => console.log(asset))
    .catch(console.error)
  });

}

// Export
module.exports = {
  uploadImage
}
