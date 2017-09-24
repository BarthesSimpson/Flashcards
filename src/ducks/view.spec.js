//test utils
import { Reducer } from 'redux-testkit'
import configureStore from 'redux-mock-store'
import testCard from '../../test/mock/card'

//action creators
import { DATA_LOADED, SET_DECK, SET_CARD, FLIP_CARD, RESET_CARD } from './view'
import {
  dataLoaded,
  setActiveDeck,
  setActiveCard,
  flipCard,
  resetCard
} from './view'

//reducer
import { initialState } from './view'
import viewReducer from './view'

//action creator tests
describe('View action creators dispatch the correct actions', () => {
  const mockStore = configureStore()
  let store
  beforeEach(() => {
    store = mockStore()
  })
  it('Sets data loaded', () => {
    store.dispatch(dataLoaded())
    expect(store.getActions()).toEqual([{ type: DATA_LOADED }])
  })
  it('Sets the active deck', () => {
    store.dispatch(setActiveDeck(testCard.deck))
    expect(store.getActions()).toEqual([{ type: SET_DECK, id: testCard.deck }])
  })
  it('Sets the active card', () => {
    store.dispatch(setActiveCard(testCard.id))
    expect(store.getActions()).toEqual([{ type: SET_CARD, id: testCard.id }])
  })
  it('Flips a card', () => {
    store.dispatch(flipCard())
    expect(store.getActions()).toEqual([{ type: FLIP_CARD }])
  })
  it('Resets the card', () => {
    store.dispatch(resetCard())
    expect(store.getActions()).toEqual([{ type: RESET_CARD }])
  })
})

//reducer tests
describe('View reducer handles actions correctly', () => {
  it('should have initial state', () => {
    expect(viewReducer()).toEqual(initialState)
  })
  it('handles DATA_LOADED action', () => {
    const action = dataLoaded()
    const result = { ...initialState, dataLoaded: true }
    Reducer(viewReducer)
      .expect(action)
      .toReturnState(result)
  })
  it('handles SET_DECK action', () => {
    const action = setActiveDeck(testCard.deck)
    const result = { ...initialState, activeDeck: testCard.deck }
    Reducer(viewReducer)
      .expect(action)
      .toReturnState(result)
  })
  it('handles SET_CARD action', () => {
    const action = setActiveCard(testCard.id)
    const result = { ...initialState, activeCard: testCard.id }
    Reducer(viewReducer)
      .expect(action)
      .toReturnState(result)
  })
  it('handles FLIP_CARD action', () => {
    const action = flipCard()
    const result = { flipped: true }
    Reducer(viewReducer)
      .withState({ flipped: false })
      .expect(action)
      .toReturnState(result)
  })
  it('handles RESET_CARD action', () => {
    const action = flipCard()
    const result = { flipped: false }
    Reducer(viewReducer)
      .withState({ flipped: true })
      .expect(action)
      .toReturnState(result)
  })
})
