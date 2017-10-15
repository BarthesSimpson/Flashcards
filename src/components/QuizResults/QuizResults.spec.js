import React from 'react'
import QuizResults from './'
import { store } from '../../ducks/'
import renderer from 'react-test-renderer'
import testDeck from '../../../test/mock/deck'
import testCard from '../../../test/mock/card'

const mockNavigation = {
  navigate: jest.fn(),
  state: { params: { deck: testDeck, cards: [testCard] } }
}
it('renders without crashing', () => {
  const rendered = renderer
    .create(<QuizResults store={store} navigation={mockNavigation} />)
    .toJSON()
  expect(rendered).toBeTruthy()
})
