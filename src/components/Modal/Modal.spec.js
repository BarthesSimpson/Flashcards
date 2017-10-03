import React from 'react'
import Modal from './'
import { Provider } from 'react-redux'
import { store } from '../../ducks/'
import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const rendered = renderer
    .create(
      <Provider store={store}>
        <Modal />
      </Provider>
    )
    .toJSON()
  expect(rendered).toBeTruthy()
})
