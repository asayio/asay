// Import
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../rootReducer'

// Store
export default function configureStore(initialState, history) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, routerMiddleware(history), createLogger())
  )
  if (module.hot) {
    module.hot.accept('../rootReducer', () => {
      const nextRootReducer = require('../rootReducer').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
