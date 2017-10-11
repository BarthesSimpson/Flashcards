import React from 'react'
import NewCard from './'
import { store } from '../../ducks/'
import renderer from 'react-test-renderer'
import testDeck from '../../../test/mock/deck'

const mockNavigation = {
  navigate: jest.fn(),
  state: { params: { deck: 'Jokes' } }
}

it('renders without crashing', () => {
  const rendered = renderer
    .create(<NewCard store={store} navigation={mockNavigation} />)
    .toJSON()
  expect(rendered).toBeTruthy()
})
