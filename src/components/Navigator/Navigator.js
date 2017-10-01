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
import Quiz from '../Quiz'
import Edit from '../Edit'

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
      return { title: navigation.state.params.deck.id }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => {
      return { title: `${navigation.state.params.deck.id} Quiz` }
    }
  },
  Edit: {
    screen: Edit,
    navigationOptions: ({ navigation }) => {
      return { title: `Edit ${navigation.state.params.deck.id}` }
    }
  }
})

export default () => <Navigator />
