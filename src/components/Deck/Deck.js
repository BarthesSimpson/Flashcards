//REACT
import React from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  StatusBar
} from 'react-native'
import { Constants } from 'expo'

//REDUX
import { connect } from 'react-redux'
import { getDeckLengths } from '../../ducks/decks'

//STYLING
import { eggyolk, firebrick, darklime } from '../../common/constants/colors.js'

var styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight
  },
  container: {
    backgroundColor: darklime
  },
  deckbox: {
    backgroundColor: firebrick,
    alignSelf: 'stretch',
    padding: 10,
    marginBottom: 1
  },
  deckTitle: {
    fontSize: 18,
    color: eggyolk,
    textAlign: 'center'
  },
  buttons: {},
  button: {},
  buttonText: {
    color: eggyolk,
    fontSize: 12,
    textAlign: 'center'
  }
})

// PARTIALS
const DeckTitle = deck => {
  return <Text style={styles.deckTitle}>{deck.id}</Text>
}

const Buttons = (start, edit) => {
  return (
    <View style={styles.buttons}>
      <TouchableOpacity onPress={start} style={styles.button}>
        <Text style={styles.buttonText}> Start Quiz </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={edit} style={styles.button}>
        <Text style={styles.buttonText}> Edit Cards </Text>
      </TouchableOpacity>
    </View>
  )
}

// NAVIGATION THINKS
const startQuiz = navigation => () =>
  navigation.navigate('Quiz', { deck: navigation.state.params.deck, title: 'butt' })
const editDeck = navigation => () =>
  navigation.navigate('Edit', { deck: navigation.state.params.deck })

//RENDER
export const Deck = ({ navigation }) => (
  <View>
    {DeckTitle(navigation.state.params.deck)}
    {Buttons(startQuiz(navigation), editDeck(navigation))}
  </View>
)

export default Deck