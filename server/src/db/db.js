// Variables
const pgp = require('pg-promise')();
const cx = pgp(process.env.DATABASE);
const path = require('path');

// Helper for linking to external query files:
function sql(file) {
    const fullPath = path.join(__dirname, file);
    return new pgp.QueryFile(fullPath, {minify: true});
}

// Export to master
module.exports = {
  cx,
  sql
};
