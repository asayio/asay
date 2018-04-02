// Import
const apiKey = process.env.SENDINBLUE;
const db = require('../db/db');
const R = require('ramda');
const sendinblue = require('sendinblue-api');
const fs = require('fs');
const cheerio = require('cheerio');

// Functions
async function resultsMailBatch() {
  const proposalList = await db.cx.query('select * from proposal');
  for (const proposal of proposalList) {
    const voteList = await db.cx.query('select * from vote where proposal_id = ' + proposal.id);
    for (const vote of voteList) {
      const [user] = await db.cx.query('select * from public.user where id = ' + vote.user_id);
      if (user.result_notification) {
        fs.readFile(__dirname + '/newResultsTemplate.html', 'utf8', function(err, html) {
          if (err) {
            throw err;
          }
          var client = new sendinblue({ apiKey, timeout: 5000 });
          const htmlNode = cheerio.load(html);
          htmlNode('#header-proposal-title').html(proposal.data.shortTitel);
          htmlNode('#name').html(user.firstname);
          htmlNode('#proposal-title').html(proposal.data.shortTitel.toLowerCase());
          htmlNode('#proposal-button').after(
            '<a id="proposal-button-link" style="text-decoration:none; color:#ffffff; font-weight:normal;" target="_blank" href="' +
              'https://app.initiativet.dk/proposal/' +
              proposal.id +
              '"> <strong>Se resultaterne for forslaget</strong></a>'
          );
          const data = {
            to: {
              [user.email]: user.firstname
            },
            from: ['dinevenner@initiativet.dk', 'Initiativet'],
            subject: 'Der er kommet nye lovforslag til dig!',
            html: htmlNode.html()
          };
          client.send_email(data, function(err, response) {
            console.log(response);
          });
        });
      }
    }
  }
}

// Export
module.exports = resultsMailBatch;
