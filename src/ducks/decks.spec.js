//test utils
import { Reducer } from 'redux-testkit'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import MockAsyncStorage from '../../test/mock/AsyncStorage'
import testDeck from '../../test/mock/deck'
import testCard from '../../test/mock/card'
import { storageKey } from '../common/constants/config'

//action creators
import { CREATE, READ as READ_DECKS, UPDATE, DELETE, ERROR } from './decks'
import { READ as READ_CARDS } from './cards'
import {
  createDeck,
  loadDecks,
  updateDeck,
  deleteDeck,
  dataLoadError
} from './decks'

//constants
import { errors } from '../common/constants/messages'

//async
import { getStoredData } from './decks'

//reducer
import { initialState } from './decks'
import decksReducer from './decks'

//action creator tests
describe('Deck action creators dispatch the correct actions', () => {
  const mockStore = configureStore()
  let store
  beforeEach(() => {
    store = mockStore()
  })
  it('Creates a new deck', () => {
    store.dispatch(createDeck(testDeck))
    expect(store.getActions()).toEqual([{ type: CREATE, deck: testDeck }])
  })
  it('Loads deck', () => {
    store.dispatch(loadDecks())
    expect(store.getActions()).toEqual([{ type: READ_DECKS }])
  })
  it('Updates an existing deck', () => {
    store.dispatch(updateDeck(testDeck.id, testDeck))
    expect(store.getActions()).toEqual([
      {
        type: UPDATE,
        id: testDeck.id,
        deck: testDeck
      }
    ])
  })
  it('Deletes an existing deck', () => {
    store.dispatch(deleteDeck(testDeck.id))
    expect(store.getActions()).toEqual([{ type: DELETE, id: testDeck.id }])
  })
  it('Fires an error', () => {
    store.dispatch(dataLoadError())
    expect(store.getActions()).toEqual([
      {
        type: ERROR,
        message: errors.dataLoadErr
      }
    ])
  })
})

//reducer tests
describe('Deck reducer handles actions correctly', () => {
  it('should have initial state', () => {
    expect(decksReducer()).toEqual(initialState)
  })

  it('handles CREATE action', () => {
    const action = createDeck(testDeck)
    const result = { [testDeck.id]: testDeck }
    Reducer(decksReducer)
      .expect(action)
      .toReturnState(result)
  })
  it('handles LOAD action', () => {
    const action = loadDecks({ [testDeck.id]: testDeck })
    const result = { [testDeck.id]: testDeck }
    Reducer(decksReducer)
      .expect(action)
      .toReturnState(result)
  })
  it('handles UPDATE action', () => {
    const newDeck = {
      question: "What's brown and sticky?",
      answer: 'A stick!!!!!11111!1!lololol'
    }
    const action = updateDeck(testDeck.id, newDeck)
    const result = { [testDeck.id]: { ...testDeck, ...newDeck } }
    Reducer(decksReducer)
      .withState({ [testDeck.id]: testDeck })
      .expect(action)
      .toReturnState(result)
  })
  it('handles DELETE action', () => {
    const action = deleteDeck(testDeck.id)
    const result = {}
    Reducer(decksReducer)
      .withState({ [testDeck.id]: testDeck })
      .expect(action)
      .toReturnState(result)
  })
})

//async tests
describe('Card async actions resolve as expected', () => {
  //SET UP ASYNC STORAGE
  const cache = {
    [storageKey]: {
      decks: { [testDeck.id]: testDeck },
      cards: { [testCard.id]: testCard }
    }
  }
  const asyncStorage = new MockAsyncStorage(cache)

  //SET UP REDUX STORE
  const middlewares = [thunk]
  const mockStore = configureStore(middlewares)
  let store

  beforeEach(() => {
    store = mockStore()
  })
  it('Loads data from AsyncStorage', async () => {
    await store.dispatch(await getStoredData(asyncStorage))
    expect(store.getActions()).toEqual([
      {
        type: READ_DECKS,
        decks: cache[storageKey].decks
      },
      {
        type: READ_CARDS,
        cards: cache[storageKey].cards
      }
    ])
  })
})

describe('Card async actions reject as expected', () => {
  // SET UP ASYNC STORAGE
  const asyncStorage = {
    getItem: jest.fn(() => Promise.reject('Oh noes!'))
  }

  // SET UP REDUX STORE
  const middlewares = [thunk]
  const mockStore = configureStore(middlewares)
  let store

  beforeEach(() => {
    store = mockStore()
  })

  it('Handles errors from AsyncStorage', async () => {
    await store.dispatch(await getStoredData(asyncStorage))
    expect(store.getActions()).toEqual([
      {
        type: ERROR,
        message: errors.dataLoadErr
      }
    ])
  })
})
