const getCandidateProfile = require('../db/candidate/getCandidateProfile');
const buildIndexHTML = require('./buildIndexHTML');

async function botMetaTagServer(host, path) {
  const pathSplit = path.split('/');
  const entity = pathSplit[1];
  const entityId = pathSplit[2];
  let og = {
    // insert default
    title: '',
    description: '',
    image: '',
    alt: '',
    url: host + path,
    host: host
  };
  if (entity === 'candidate') {
    const candidate = await getCandidateProfile(entityId);
    og = {
      title: candidate.firstname + ' ' + candidate.lastname + ' | Initiativet',
      description: '@sebastian',
      image: candidate.picture + '?w=256&h=256&fit=fill',
      alt: candidate.firstname + ' ' + candidate.lastname + 's candidate profile picture',
      url: host + path,
      host: host
    };
  }
  const html = buildIndexHTML(og);
  return html;
}

module.exports = botMetaTagServer;
