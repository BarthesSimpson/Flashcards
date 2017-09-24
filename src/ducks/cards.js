import _ from 'lodash'

// Actions
export const CREATE = 'flashcards/cards/CREATE'
export const READ = 'flashcards/cards/READ'
export const UPDATE = 'flashcards/cards/UPDATE'
export const DELETE = 'flashcards/cards/DELETE'

// Reducer
export const initialState = {}
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE:
      return { ...state, [action.card.id]: action.card }
    case READ:
      return action.cards
    case UPDATE:
      return { ...state, [action.id]: { ...state[action.id], ...action.card } }
    case DELETE:
      return _.omit(state, action.id)
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
    type: READ,
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