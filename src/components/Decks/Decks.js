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
  base,
  eggyolk,
  firebrick,
  darklime
} from '../../common/constants/colors.js'

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight
  },
  card: {
    backgroundColor: base,
    flex: 1
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
  cardCount: {
    fontSize: 12,
    color: eggyolk,
    textAlign: 'center'
  }
})

// PARTIALS

const DecksList = (decks, deckLengths, navigation) => {
  return (
    <View style={styles.container}>
      {Object.keys(decks).map(d => {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate('Deck', { deck: decks[d] })}
            style={styles.deckbox}
            key={d}
          >
            <Text style={styles.deckTitle}>{d}</Text>
            <Text style={styles.cardCount}>{`(${deckLengths[d]} cards)`}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

//RENDER
export const Decks = ({ decks, deckLengths, deckTitles, navigation }) => (
  <View style={styles.card}>
    {deckTitles.length ? (
      DecksList(decks, deckLengths, navigation)
    ) : (
      <Text>You don't have any decks yet!</Text>
    )}
  </View>
)

//CONNECT
const mapStateToProps = state => {
  return {
    decks: state.decks,
    deckLengths: getDeckLengths(state),
    deckTitles: Object.keys(state.decks)
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks)
