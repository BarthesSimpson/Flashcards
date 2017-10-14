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
import {
  eggyolk,
  firebrick,
  base,
  accent1,
  accent2,
  darklime
} from '../../common/constants/colors.js'

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight
  },
  container: {
    backgroundColor: base,
    flex: 1
  },
  deckDescription: {
    fontSize: 16,
    color: eggyolk,
    textAlign: 'center',
    marginTop: 10
  },
  cardCount: {
    fontSize: 12,
    color: eggyolk,
    textAlign: 'center'
  },
  buttons: {
    marginTop: 10,
    marginBottom: 10
  },
  button: {
    backgroundColor: firebrick,
    alignSelf: 'stretch',
    padding: 10,
    marginBottom: 1
  },
  liteButton: {
    backgroundColor: accent1
  },
  buttonText: {
    color: eggyolk,
    fontSize: 18,
    textAlign: 'center'
  },
  liteButtonText: {
    color: darklime
  }
})

// PARTIALS
const DeckDescription = (deck, deckLength) => (
  <View>
    <Text style={styles.deckDescription}>{deck.description}</Text>
    <Text style={styles.cardCount}>
      {`(${deckLength} card${deckLength === 1 ? '' : 's'})`}
    </Text>
  </View>
)

const Buttons = (start, edit) => {
  return (
    <View style={styles.buttons}>
      <TouchableOpacity onPress={start} style={styles.button}>
        <Text style={styles.buttonText}> Start Quiz </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={edit}
        style={[styles.button, styles.liteButton]}
      >
        <Text style={[styles.buttonText, styles.liteButtonText]}>
          {' '}
          View/Edit Cards{' '}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

// NAVIGATION THUNKS
const startQuiz = navigation => () =>
  navigation.navigate('Quiz', { deck: navigation.state.params.deck })
const editDeck = navigation => () =>
  navigation.navigate('Edit', { deck: navigation.state.params.deck })

//RENDER
export const Deck = ({ navigation }) => {
  const { deck, deckLength } = navigation.state.params
  return (
    <View style={styles.container}>
      {DeckDescription(deck, deckLength)}
      {Buttons(startQuiz(navigation), editDeck(navigation))}
    </View>
  )
}

export default Deck
