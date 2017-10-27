// Import
const pgp = require('pg-promise')();
const db = require('../db');

// Functions
async function updateProposalList (proposalList) {
  console.log("started writing proposals to db");
  await db.cx.tx(t => {
    const columnSet = new pgp.helpers.ColumnSet(['id', 'data'], {table: 'proposal'});
    const query = pgp.helpers.insert(proposalList, columnSet);
    const q1 = t.none('delete from proposal');
    const q2 =t.none(query)
    return t.batch([q1, q2]);
  })
  console.log("finished writing proposals to db");
  return true
}

// Export
module.exports = updateProposalList
