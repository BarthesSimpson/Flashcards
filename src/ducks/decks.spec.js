//test utils
import { Reducer } from 'redux-testkit'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import MockAsyncStorage from '../../test/mock/AsyncStorage'
import testDeck from '../../test/mock/deck'
import testCard from '../../test/mock/card'
import { storageKey } from '../common/constants/config'

//action creators
import {
  CREATE,
  READ as READ_DECKS,
  UPDATE,
  DELETE,
  ERROR,
  CLEAR
} from './decks'
import { READ as READ_CARDS } from './cards'
import { DATA_LOADED } from './view'
import {
  createDeck,
  loadDecks,
  updateDeck,
  deleteDeck,
  dataLoadError,
  dataClearError,
  dataWriteError
} from './decks'

//constants
import { errors } from '../common/constants/messages'

//async
import { getStoredData, setStoredData, clearStoredData } from './decks'

//reducer
import { initialState } from './decks'
import { initialState as initialCards } from './cards'
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
      .withState({})
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
      },
      { type: DATA_LOADED }
    ])
  })

  it('Clears data from AsyncStorage', async () => {
    await store.dispatch(await clearStoredData(asyncStorage))
    expect(store.getActions()).toEqual([
      {
        type: READ_DECKS,
        decks: initialState
      },
      {
        type: READ_CARDS,
        cards: initialCards
      },
      { type: DATA_LOADED }
    ])
  })
})

describe('Card async actions reject as expected', () => {
  // SET UP ASYNC STORAGE
  const failStorage = {
    getItem: jest.fn(() => Promise.reject('Oh noes!')),
    setItem: jest.fn(() => Promise.reject('Oh noes!')),
    removeItem: jest.fn(() => Promise.reject('Oh noes!'))
  }

  // SET UP REDUX STORE
  const middlewares = [thunk]
  const mockStore = configureStore(middlewares)
  let store

  beforeEach(() => {
    store = mockStore()
  })

  it('Handles read error from AsyncStorage', async () => {
    await store.dispatch(await getStoredData(failStorage))
    expect(store.getActions()).toEqual([
      {
        type: ERROR,
        message: errors.dataLoadErr
      }
    ])
  })
  it('Handles write error from AsyncStorage', async () => {
    await store.dispatch(await setStoredData(null, null, failStorage))
    expect(store.getActions()).toEqual([
      {
        type: ERROR,
        message: errors.dataWriteErr
      }
    ])
  })
  it('Handles clear error from AsyncStorage', async () => {
    await store.dispatch(await clearStoredData(failStorage))
    expect(store.getActions()).toEqual([
      {
        type: ERROR,
        message: errors.dataClearErr
      }
    ])
  })
})
