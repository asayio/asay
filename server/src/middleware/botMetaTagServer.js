const getCandidateProfile = require('../db/candidate/getCandidateProfile');
const getProjectProfile = require('../db/project/getProjectProfile');
const getProposalProfile = require('../db/proposal/getProposalProfile');
const buildIndexHTML = require('./buildIndexHTML');

async function botMetaTagServer(host, path) {
  const pathSplit = path.split('/');
  const entity = pathSplit[1];
  const entityId = pathSplit[2];
  let og = {
    // default and fall-back og:
    title: 'Initiativets digitale platform | Initiativet',
    description:
      'På Initiativets digitale platform kan du følge med i alle forslag fra Folketinget, finde borgernes egne politiske projekter, udvikle dine egne projekter eller stille op som kandidat.',
    image: host + '/initiativet_og.png',
    height: 630,
    width: 1200,
    alt: 'Initiativets logo på en stor grå baggrund',
    url: host + path,
    host: host
  };
  if (entity === 'candidate') {
    const candidate = await getCandidateProfile(entityId);
    if (candidate) {
      og = {
        title: candidate.firstname + ' ' + candidate.lastname + ' | Initiativet',
        description: candidate.motivation,
        image: candidate.picture + '?w=476&h=476&fit=fill',
        height: 476,
        width: 476,
        alt: candidate.firstname + ' ' + candidate.lastname + ' | Initiativet',
        url: host + path,
        host: host
      };
    }
  }
  if (entity === 'candidates') {
    og = {
      title: 'Initiativets kandidater | Initiativet',
      description:
        'På Initiativets digitale platform kan du finde Initiativets kandidater, læse om deres motivation og kvalifikationer, støtte den bedste, eller tilmelde dig opstilling på Initiativets liste.',
      image: host + '/initiativet_og.png',
      height: 630,
      width: 1200,
      alt: 'Initiativets logo på en stor grå baggrund',
      url: host + path,
      host: host
    };
  }
  if (entity === 'project') {
    const project = await getProjectProfile(entityId);
    if (project) {
      og = {
        title: project.title + ' | Initiativet',
        description: project.description,
        image: host + '/assets/category-images/' + project['category_id'] + '.png',
        height: 630,
        width: 1200,
        alt: project.title + ' | Initiativet',
        url: host + path,
        host: host
      };
    }
  }
  if (entity === 'projects') {
    og = {
      title: 'Politiske projekter | Initiativet',
      description:
        'På Initiativets digitale platform kan du finde borgernes politiske projekter, støtte de bedste, eller udvikle dit eget projekt.',
      image: host + '/initiativet_og.png',
      height: 630,
      width: 1200,
      alt: 'Initiativets logo på en stor grå baggrund',
      url: host + path,
      host: host
    };
  }
  if (entity === 'proposal') {
    const proposal = await getProposalProfile(entityId);
    if (proposal) {
      og = {
        title: proposal.shortTitel + ' | Initiativet',
        description: proposal.resume,
        image: host + '/assets/category-images/' + proposal.category + '.png',
        height: 630,
        width: 1200,
        alt: proposal.shortTitel + ' | Initiativet',
        url: host + path,
        host: host
      };
    }
  }
  if (entity === 'proposals') {
    og = {
      title: 'Forslag fra Folketinget | Initiativet',
      description:
        'På Initiativets digitale platformm kan du følge med i alle forslag fra Folketinget, læse deres resumeer og formål, give din mening til kende og se afstemningsresultaterne.',
      image: host + '/initiativet_og.png',
      height: 630,
      width: 1200,
      alt: 'Initiativets logo på en stor grå baggrund',
      url: host + path,
      host: host
    };
  }
  const html = buildIndexHTML(og);
  return html;
}

module.exports = botMetaTagServer;
