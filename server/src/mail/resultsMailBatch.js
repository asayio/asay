// Import
const apiKey = process.env.SENDINBLUE;
const db = require('../db/db')
const R = require('ramda')
const sendinblue = require('sendinblue-api')

// Functions
async function resultsMailBatch(proposal) {
  const voteList = await db.cx.query('select * from vote where proposal_id = ' + proposal.id);
  for (const vote of voteList) {
    const [user] = await db.cx.query('select * from public.user where id = ' + vote.user_id);
    if (user.result_notification) {
      const client = new sendinblue({apiKey, timeout: 5000})
      const body = 'Der er kommet resultater på lovforslaget ' + proposal.shortTitel + '. <br><br><a href="https://app.initiativet.dk/proposal/' + proposal.id + '">Klik her for at se resultaterne.</a>'
      const data = {
        "to": {
          [user.email]: user.firstname
        },
    		"from": [
          "dinevenner@initiativet.dk",
          "Initiativet"
        ],
    		"subject": "Der er kommet resultater på et lovforslag du har stemt på!",
    		"html": body
    	}
      client.send_email(data, function(err, response) {
        console.log(response);
      })
    }
  }
}

// Export
module.exports = resultsMailBatch
