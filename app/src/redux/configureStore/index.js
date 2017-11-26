if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
  module.exports = require('./configureStore.development.js')
} else {
  module.exports = require('./configureStore.production.js')
}
