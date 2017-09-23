import { AsyncStorage } from 'react-native'

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
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    // do reducer stuff
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
