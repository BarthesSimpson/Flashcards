import React from 'react'
import Decks from './'
import { store } from '../../ducks/'
import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const rendered = renderer
    .create(<Decks store={store} screenProps={{ rootNavigation: 'dummy' }} />)
    .toJSON()
  expect(rendered).toBeTruthy()
})
