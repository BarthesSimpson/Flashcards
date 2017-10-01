import React from 'react'
import { Provider } from 'react-redux'
import LandingScreen from './'

import { store } from '../../ducks/'

import renderer from 'react-test-renderer'

describe('Landing Screen tests', () => {
  it('renders splash without crashing', () => {
    const testProps = { dataLoaded: false, loadData: jest.fn() }
    const rendered = renderer
      .create(
        <Provider store={store}>
          <LandingScreen {...testProps} />
        </Provider>
      )
      .toJSON()
    expect(rendered).toBeTruthy()
  })
  it('renders navigation without crashing', () => {
    const testProps = { dataLoaded: true, loadData: jest.fn() }
    const rendered = renderer
      .create(
        <Provider store={store}>
          <LandingScreen {...testProps} />
        </Provider>
      )
      .toJSON()
    expect(rendered).toBeTruthy()
  })
})
