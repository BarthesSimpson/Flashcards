//REACT
import React from 'react'
import LandingScreen from './src/components/LandingScreen'

//REDUX
import { store } from './src/ducks'
import { Provider } from 'react-redux'
import { setLocalNotification } from '.src/ducks/notifications'

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
        <LandingScreen />
      </Provider>
    )
  }
}
