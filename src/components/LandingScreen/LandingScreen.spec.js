import React from 'react'
import { LandingScreen } from './LandingScreen'

import renderer from 'react-test-renderer'
const testProps = { dataLoaded: true }
it('renders without crashing', () => {
  const rendered = renderer.create(<LandingScreen {...testProps} />).toJSON()
  expect(rendered).toBeTruthy()
})
