// Actions
export const SET_DECK = 'flashcards/view/SET_DECK'
export const SET_CARD = 'flashcards/view/SET_CARD'
export const FLIP_CARD = 'flashcards/view/FLIP_CARD'
export const RESET_CARD = 'flashcards/view/RESET_CARD'

// Constants
import { errors } from '../common/constants/messages'
import { storageKey } from '../common/constants/config'

// Reducer
export const initialState = {
  flipped: false
}
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_DECK:
    return { ...state, activeDeck: action.id }
    case SET_CARD:
      return { ...state, activeCard: action.id }
    case FLIP_CARD:
      return { ...state, flipped: !state.flipped }
    case RESET_CARD:
      return { ...state, flipped: false }
    default:
      return state
  }
}

// Action Creators
export function setActiveDeck(id) {
  return {
    type: SET_DECK,
    id
  }
}

export function setActiveCard(id) {
  return {
    type: SET_CARD,
    id
  }
}

export function flipCard() {
  return {
    type: FLIP_CARD,
  }
}

export function resetCard() {
  return {
    type: RESET_CARD,
  }
}
