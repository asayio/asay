// Import
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// Reducers
import proposalArticleReducer from './ducks/proposal/article'
import userReducer from './ducks/user'

// Root reducer
const rootReducer = combineReducers({
  user: userReducer,
  proposal: combineReducers({
    article: proposalArticleReducer
  }),
  router: routerReducer
})

// Export
export default rootReducer
