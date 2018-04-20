// Import
const db = require('../db')
const selectCommitteeList = db.sql('./preference/sql/selectCommitteeList.sql')

async function getCommitteeList (userId) {
  const comitteeList = await db.cx.query(selectCommitteeList,
    {
      user: userId,
    }
  );
  return comitteeList
}

// Export
module.exports = getCommitteeList
