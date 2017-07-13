const fs = require('fs-extra');
fs.emptyDirSync('./app');
fs.copySync('../app/build', './app');
