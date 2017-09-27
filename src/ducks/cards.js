import _ from 'lodash'

// Actions
export const CREATE = 'flashcards/cards/CREATE'
export const READ = 'flashcards/cards/READ'
export const UPDATE = 'flashcards/cards/UPDATE'
export const DELETE = 'flashcards/cards/DELETE'

// Reducer
export const initialState = {
  '1': {
    deck: 'Jokes',
    question: "What's orange and sounds like a parrot?",
    answer: 'A carrot'
  },
  '2': {
    deck: 'Jokes',
    question: 'Take my wife',
    answer: 'No, please - take her'
  },
  '3': {
    deck: 'Riddles',
    question: 'When is a raven like a writing desk',
    answer: 'Nevermore'
  },
  '4': {
    deck: 'Riddles',
    question: "What's black and white and red all over?",
    answer: 'A newspaper'
  },
  '5': {
    deck: 'Riddles',
    question: 'Why did the chicken cross the road',
    answer: 'Because he lacked integrity'
  }
}
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
