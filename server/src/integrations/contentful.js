// Import
const apiKey = process.env.CONTENTFUL;
const fetch = require('node-fetch');
const request = require('request')
const R = require('ramda')

// Functions
async function uploadImage(image) {
  request({
    url: "https://upload.contentful.com/spaces/ihbts236hb1z/uploads",
    headers: {
      "Authorization": "Bearer " + apiKey,
      "Content-Type": "application/octet-stream"
    },
    method: "POST",
    body: image
  }, function (error, response, body){
    request({
      url: "https://upload.contentful.com/spaces/ihbts236hb1z/assets",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/vnd.contentful.management.v1+json"
      },
      method: "POST",
      body: {
        "fields": {
          "title": {
            "en-US": "My cute cat pic"
          },
          "file": {
            "en-US": {
              "contentType": "image/png",
              "fileName": "cute_cat.png",
              "uploadFrom": {
                "sys": {
                  "type": "Link",
                  "linkType": "Upload",
                  "id": JSON.parse(body).sys.id
                }
              }
            }
          }
        }
      }
    }, function (error, response, body){
      console.log(body);
    });
  });
}

// Export
module.exports = {
  uploadImage
}
