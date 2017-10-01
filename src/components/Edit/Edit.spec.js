import React from 'react'
import Edit from './'
import { store } from '../../ducks/'
import renderer from 'react-test-renderer'
import testDeck from '../../../test/mock/deck'

const mockNavigation = {
  navigate: jest.fn(),
  state: { params: { deck: testDeck } }
}

it('renders without crashing', () => {
  const rendered = renderer
    .create(<Edit store={store} navigation={mockNavigation} />)
    .toJSON()
  expect(rendered).toBeTruthy()
})
