import { AsyncStorage } from 'react-native'
import _ from 'lodash'
import { createSelector } from 'reselect'

// Constants
import { errors } from '../common/constants/messages'
import { storageKey } from '../common/constants/config'

// Actions
export const CREATE = 'flashcards/decks/CREATE'
export const READ = 'flashcards/decks/READ'
export const UPDATE = 'flashcards/decks/UPDATE'
export const DELETE = 'flashcards/decks/DELETE'
export const ERROR = 'flashcards/decks/ERROR'
export const CLEAR = 'flashcards/decks/CLEAR'

import { loadCards, initialState as initialCards } from './cards'
import { dataLoaded } from './view'

// Reducer
export const initialState = {
  Jokes: {
    id: 'Jokes',
    description: 'Very funny joakes!!'
  },
  Riddles: {
    id: 'Riddles',
    description: 'Will u solve these mystery!?'
  },
  Slanders: {
    id: 'Slanders',
    description: 'How dare you?!'
  }
}
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE:
      return { ...state, [action.deck.id]: action.deck }
    case READ:
      return action.decks
    case UPDATE:
      return { ...state, [action.id]: { ...state[action.id], ...action.deck } }
    case DELETE:
      return _.omit(state, action.id)
    default:
      return state
  }
}

// Action Creators
export function createDeck(deck) {
  return {
    type: CREATE,
    deck
  }
}

export function loadDecks(decks) {
  return {
    type: READ,
    decks
  }
}

export function updateDeck(id, deck) {
  return {
    type: UPDATE,
    id,
    deck
  }
}

export function deleteDeck(id) {
  return {
    type: DELETE,
    id
  }
}

export function clearStorage() {
  return {
    type: CLEAR
  }
}

//should move this and import
export function dataLoadError() {
  return {
    type: ERROR,
    message: errors.dataLoadErr
  }
}
export function dataClearError() {
  return {
    type: ERROR,
    message: errors.dataClearErr
  }
}
export function dataWriteError() {
  return {
    type: ERROR,
    message: errors.dataWriteErr
  }
}

// Selectors
const decksSelector = state => state.decks
const cardsSelector = state => state.cards
export const getDeckLengths = createSelector(
  decksSelector,
  cardsSelector,
  (decks, cards) => {
    const cardCount = Object.keys(cards).reduce((l, r) => {
      const d = cards[r].deck
      l[d] = l[d] ? l[d] + 1 : 1
      return l
    }, {})
    return Object.keys(decks).reduce((l, r) => {
      l[r] = cardCount[r] ? cardCount[r] : 0
      return l
    }, {})
  }
)

// side effects & async
export function getStoredData(storage = AsyncStorage) {
  return async dispatch => {
    try {
      let data = await storage.getItem(storageKey)
      if (!data) {
        data = { decks: initialState, cards: initialCards }
        console.log('setting', data)
        storage.setItem(storageKey, JSON.stringify(data))
      } else {
        data = typeof data === 'string' ? JSON.parse(data) : data
      }
      dispatch(loadDecks(data.decks))
      dispatch(loadCards(data.cards))
      dispatch(dataLoaded())
    } catch (error) {
      console.error(error)
      dispatch(dataLoadError())
    }
  }
}

export function setStoredData(data, next, storage = AsyncStorage) {
  return async dispatch => {
    try {
      const write = await storage.setItem(storageKey, JSON.stringify(data))
      if (write) {
        next()
      }
    } catch (error) {
      console.error(error)
      dispatch(dataWriteError())
    }
  }
}

export function clearStoredData(storage = AsyncStorage) {
  return async dispatch => {
    try {
      const clear = await storage.removeItem(storageKey)
      if (clear) {
        dispatch(loadDecks(initialState))
        dispatch(loadCards(initialCards))
        dispatch(dataLoaded())
      }
    } catch (error) {
      console.error(error)
      dispatch(dataClearError())
    }
  }
}
