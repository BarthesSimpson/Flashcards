import React from 'react'
import Navigator from './'
import { Provider } from 'react-redux'
import { store } from '../../ducks/'
import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const rendered = renderer
    .create(
      <Provider store={store}>
        <Navigator />
      </Provider>
    )
    .toJSON()
  expect(rendered).toBeTruthy()
})
