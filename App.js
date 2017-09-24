//REACT
import React from 'react'
import LandingScreen from './src/components/LandingScreen'

//REDUX
import { store } from './src/ducks'
import { Provider } from 'react-redux'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <LandingScreen />
      </Provider>
    )
  }
}
