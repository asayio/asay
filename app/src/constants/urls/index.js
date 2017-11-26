if (process.env.NODE_ENV === 'development') {
  module.exports = require('./urls.development')
} else if (process.env.NODE_ENV === 'staging') {
  module.exports = require('./urls.staging')
} else {
  module.exports = require('./urls.production')
}
