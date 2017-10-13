//test utils
import { Reducer } from 'redux-testkit'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import MockAsyncStorage from '../../test/mock/AsyncStorage'
import testCard from '../../test/mock/card'
import { storageKey } from '../common/constants/config'

//action creators
import { CREATE, READ, UPDATE, DELETE, ERROR } from './cards'
import { createCard, loadCards, updateCard, deleteCard } from './cards'

//constants
import { errors } from '../common/constants/messages'

//selectors
import { getCards } from './cards'

//async
import { getStoredCards } from './cards'
import { upsertCard } from './cards'

//reducer
import { initialState } from './cards'
import { initialDecks } from './decks'
import cardsReducer from './cards'

//action creator tests
describe('Card action creators dispatch the correct actions', () => {
  const middlewares = [thunk]
  const mockStore = configureStore()
  let store
  beforeEach(() => {
    store = mockStore()
  })
  it('Creates a new card', () => {
    store.dispatch(createCard(testCard))
    expect(store.getActions()).toEqual([{ type: CREATE, card: testCard }])
  })
  it('Loads cards', () => {
    store.dispatch(loadCards())
    expect(store.getActions()).toEqual([{ type: READ }])
  })
  it('Updates an existing card', () => {
    store.dispatch(updateCard(testCard.id, testCard))
    expect(store.getActions()).toEqual([
      {
        type: UPDATE,
        id: testCard.id,
        card: testCard
      }
    ])
  })
  it('Deletes an existing card', () => {
    store.dispatch(deleteCard(testCard.id))
    expect(store.getActions()).toEqual([{ type: DELETE, id: testCard.id }])
  })
})

//reducer tests
describe('Card reducer handles actions correctly', () => {
  it('should have initial state', () => {
    expect(cardsReducer()).toEqual(initialState)
  })
  it('handles CREATE action', () => {
    const action = createCard(testCard)
    const result = { [testCard.id]: testCard }
    Reducer(cardsReducer)
      .withState({})
      .expect(action)
      .toReturnState(result)
  })
  it('handles LOAD action', () => {
    const action = loadCards({ [testCard.id]: testCard })
    const result = { [testCard.id]: testCard }
    Reducer(cardsReducer)
      .expect(action)
      .toReturnState(result)
  })
  it('handles UPDATE action', () => {
    const newCard = {
      question: "What's brown and sticky?",
      answer: 'A stick!!!!!11111!1!lololol'
    }
    const action = updateCard(testCard.id, newCard)
    const result = { [testCard.id]: { ...testCard, ...newCard } }
    Reducer(cardsReducer)
      .withState({ [testCard.id]: testCard })
      .expect(action)
      .toReturnState(result)
  })
  it('handles DELETE action', () => {
    const action = deleteCard(testCard.id)
    const result = {}
    Reducer(cardsReducer)
      .withState({ [testCard.id]: testCard })
      .expect(action)
      .toReturnState(result)
  })
})

//selector tests
describe('Cards selectors work correctly', () => {
  it('getCards correctly gets cards', () => {
    const state = {
      decks: initialDecks,
      cards: initialState
    }
    const jokeCards = [
      {
        id: '1',
        deck: 'Jokes',
        question: "What's orange and sounds like a parrot?",
        answer: 'A carrot'
      },
      {
        id: '2',
        deck: 'Jokes',
        question: 'Take my wife',
        answer: 'No, please - take her'
      }
    ]
    expect(getCards('Jokes')(state)).toEqual(jokeCards)
  })
})

//TODO Add async test for upsertCard
