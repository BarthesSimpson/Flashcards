//test utils
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import MockAsyncStorage from '../../test/mock/AsyncStorage'
import testCard from '../../test/mock/card'
import { storageKey } from '../common/constants/config'

//action creators
import { CREATE, LOAD, UPDATE, DELETE, ERROR } from './cards'
import {
  createCard,
  loadCards,
  updateCard,
  deleteCard,
  cardLoadError
} from './cards'

//constants
import { errors } from '../common/constants/messages'

//async
import { getStoredCards } from './cards'

//reducer
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
    expect(store.getActions()).toEqual([{ type: LOAD }])
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
  it('Fires an error', () => {
    store.dispatch(cardLoadError())
    expect(store.getActions()).toEqual([
      {
        type: ERROR,
        message: errors.cardLoadErr
      }
    ])
  })
})

//async tests
describe('Card async actions resolve as expected', () => {
  //SET UP ASYNC STORAGE
  const cache = {
    [storageKey]: { [testCard.id]: testCard }
  }
  const asyncStorage = new MockAsyncStorage(cache)

  //SET UP REDUX STORE
  const middlewares = [thunk]
  const mockStore = configureStore(middlewares)
  let store

  beforeEach(() => {
    store = mockStore()
  })

  it('Loads cards from AsyncStorage', async () => {
    await store.dispatch(await getStoredCards(asyncStorage))
    expect(store.getActions()).toEqual([
      {
        type: LOAD,
        cards: cache[storageKey]
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
    await store.dispatch(await getStoredCards(asyncStorage))
    expect(store.getActions()).toEqual([
      {
        type: ERROR,
        message: errors.cardLoadErr
      }
    ])
  })
})
