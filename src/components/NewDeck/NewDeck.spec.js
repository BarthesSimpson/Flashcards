import React from 'react'
import NewDeck from './'
import { store } from '../../ducks/'
import renderer from 'react-test-renderer'
import testDeck from '../../../test/mock/deck'

const mockNavigation = {
  navigate: jest.fn()
}

it('renders without crashing', () => {
  const rendered = renderer
    .create(<NewDeck store={store} navigation={mockNavigation} />)
    .toJSON()
  expect(rendered).toBeTruthy()
})
