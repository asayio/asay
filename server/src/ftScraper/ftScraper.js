// Import
const scrapeIt = require('scrape-it')

// Functions
async function ftScraper(request, response) {
  const params = request.headers
  const period = params.period;
  const type = params.type;
  const id = params.id;
  const url = `http://www.ft.dk/samling/${period}/${type}/${id}/${period}_${id}_fremsaettelsestale.htm`
  const doc = await scrapeIt(url, {
    proposer: ".Fremsaetter",
    paragraphs: ".TekstGenerel",
  }).then(page => {
    const paragraphs = page.paragraphs.split(":");
    return paragraphs
  })
  response.send(doc)
};

// Export
module.exports = {
  ftScraper
}
