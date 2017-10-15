// Import
const db = require('../db');
const pgp = require('pg-promise');

// Functions
async function updateProposalList (proposalList) {
  await db.cx.tx(t => {
    const columnSet = new pgp.helpers.ColumnSet(['id', 'data'], {table: 'proposal'});
    const query = pgp.helpers.insert(proposalList, columnSet);
    const q1 = t.none('delete from proposal');
    const q2 =t.none(query)
    return t.batch([q1, q2]);
  })
}

// Export
module.exports = updateProposalList
