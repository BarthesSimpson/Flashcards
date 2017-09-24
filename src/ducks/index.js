import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import cards from './cards'
import decks from './decks'
import view from './view'

export const reducer = combineReducers({
  cards,
  decks,
  view
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const composeEnhancers = compose
export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
)
