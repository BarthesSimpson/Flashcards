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
import NewDeck from '../NewDeck'

//STYLING
import { accent2, base, darklime } from '../../common/constants/colors'
const styleSettings = {
  headerStyle: {
    backgroundColor: accent2
  },
  headerTitleStyle: { textAlign: 'right', alignSelf: 'center' },
  headerBackTitleStyle: {
    color: darklime
  },
  headerTintColor: darklime
}
export default StackNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      title: 'Decks',
      ...styleSettings
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation }) => {
      return {
        title: navigation.state.params.deck.id,
        ...styleSettings
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => {
      return {
        title: `${navigation.state.params.deck.id} Quiz`,
        ...styleSettings
      }
    }
  },
  Edit: {
    screen: Edit,
    navigationOptions: ({ navigation }) => {
      return {
        title: `Edit ${navigation.state.params.deck.id}`,
        ...styleSettings
      }
    }
  }
})
