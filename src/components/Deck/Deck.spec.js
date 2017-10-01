import React from 'react'
import Deck from './'
import { store } from '../../ducks/'
import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const rendered = renderer
    .create(
      <Deck deck="test" store={store} />
    )
    .toJSON()
  expect(rendered).toBeTruthy()
})
