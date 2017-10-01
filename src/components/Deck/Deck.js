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

// Partials

const DeckTitle = deck => {
  console.log({deck})
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

//RENDER
export const Deck = ({ navigation, start, edit }) => (
  <View>
    {DeckTitle(navigation.state.params.deck)}
    {Buttons(start, edit)}
  </View>
)

//CONNECT
const mapStateToProps = state => {
  return {
    // deck: state.decks[state.activeDeck]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    start: () => {},
    edit: () => {}
    // start: dispatch(),
    // edit: dispatch()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck)
