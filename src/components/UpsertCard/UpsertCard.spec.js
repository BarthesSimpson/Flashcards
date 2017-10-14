import React from 'react'
import UpsertCard from './'
import { store } from '../../ducks/'
import renderer from 'react-test-renderer'
import testDeck from '../../../test/mock/deck'

const mockNavigation = {
  navigate: jest.fn(),
  state: { params: { deck: 'Jokes' } }
}

it('renders without crashing', () => {
  const rendered = renderer
    .create(<UpsertCard store={store} navigation={mockNavigation} />)
    .toJSON()
  expect(rendered).toBeTruthy()
})
