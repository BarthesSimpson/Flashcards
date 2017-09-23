import { AsyncStorage } from 'react-native'
import _ from 'lodash'

// Actions
export const CREATE = 'flashcards/cards/CREATE'
export const LOAD = 'flashcards/cards/LOAD'
export const UPDATE = 'flashcards/cards/UPDATE'
export const DELETE = 'flashcards/cards/DELETE'
export const ERROR = 'flashcards/cards/ERROR'

// Constants
import { errors } from '../common/constants/messages'
import { storageKey } from '../common/constants/config'

// Reducer
export const initialState = {}
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE:
      return { ...state, [action.card.id]: action.card }
    case LOAD:
      return action.cards
    case UPDATE:
      return { ...state, [action.id]: { ...state[action.id], ...action.card } }
    case DELETE:
      return _.omit(state, action.id)
      return newState
    default:
      return state
  }
}

// Action Creators
export function createCard(card) {
  return {
    type: CREATE,
    card
  }
}

export function loadCards(cards) {
  return {
    type: LOAD,
    cards
  }
}

export function updateCard(id, card) {
  return {
    type: UPDATE,
    id,
    card
  }
}

export function deleteCard(id) {
  return {
    type: DELETE,
    id
  }
}

//can probably move this somewhere else (not used in this reducer)
export function cardLoadError() {
  return {
    type: ERROR,
    message: errors.cardLoadErr
  }
}

// side effects & async
export async function getStoredCards(AsyncStorage = AsyncStorage) {
  return async dispatch => {
    try {
      const cards = await AsyncStorage.getItem(storageKey)
      dispatch(loadCards(cards))
    } catch (error) {
      dispatch(cardLoadError())
    }
  }
}
