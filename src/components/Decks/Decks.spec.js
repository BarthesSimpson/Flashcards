import React from 'react'
import Decks from './'

import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const rendered = renderer.create(<Decks />).toJSON()
  expect(rendered).toBeTruthy()
})
