// Imports
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../rootReducer'

// Store
export default function configureStore(initialState, history) {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk, routerMiddleware(history)))
  return store
}
