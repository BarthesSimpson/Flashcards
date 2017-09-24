import { AsyncStorage } from 'react-native'
import _ from 'lodash'

// Constants
import { errors } from '../common/constants/messages'
import { storageKey } from '../common/constants/config'

// Actions
export const CREATE = 'flashcards/decks/CREATE'
export const READ = 'flashcards/decks/READ'
export const UPDATE = 'flashcards/decks/UPDATE'
export const DELETE = 'flashcards/decks/DELETE'
export const ERROR = 'flashcards/decks/ERROR'
import { loadCards } from './cards'

// Reducer
export const initialState = {}
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

//should move this and import
export function dataLoadError() {
  return {
    type: ERROR,
    message: errors.dataLoadErr
  }
}

// side effects & async
export async function getStoredData(AsyncStorage = AsyncStorage) {
  return async dispatch => {
    try {
      const data = await AsyncStorage.getItem(storageKey)
      dispatch(loadDecks(data.decks))
      dispatch(loadCards(data.cards))
    } catch (error) {
      dispatch(dataLoadError())
    }
  }
}
