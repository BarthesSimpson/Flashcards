//REACT
import React from 'react'
// import { Text } from 'react-native'
import { StackNavigator } from 'react-navigation'

//REDUX
// import { store } from '../../ducks'
// import { Provider } from 'react-redux'

//SCREENS
import Decks from '../Decks'
import Deck from '../Deck'
// import Quiz from '../Quiz'

const Navigator = StackNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      title: 'Decks'
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation }) => {
      title: navigation.state.params.deck
    }
  }
})

export default () => <Navigator />
