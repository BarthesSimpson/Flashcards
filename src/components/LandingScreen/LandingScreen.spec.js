import React from 'react'
import { Provider } from 'react-redux'
import { LandingScreen } from './LandingScreen'

import { store } from '../../ducks/'

import renderer from 'react-test-renderer'

const testProps = { dataLoaded: true }
it('renders without crashing', () => {
  const rendered = renderer
    .create(
      <Provider store={store}>
        <LandingScreen {...testProps} />
      </Provider>
    )
    .toJSON()
  expect(rendered).toBeTruthy()
})
