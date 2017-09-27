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
    height: Constants.statusBarHeight,
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

// Partials

const NiceStatusBar = () => {
  return (
    <View style={styles.statusBar}>
      <StatusBar translucent />
    </View>
  )
}

const DecksList = (decks, deckLengths) => {
  return (
    <View style={styles.container}>
      {Object.keys(decks).map(d => {
        return (
          <TouchableOpacity onPress={() => {}} style={styles.deckbox} key={d}>
            <Text style={styles.deckTitle}>{d}</Text>
            <Text style={styles.cardCount}>{`(${deckLengths[d]} cards)`}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

//RENDER
export const Decks = ({ decks, deckLengths, deckTitles }) => (
  <View>
    {NiceStatusBar()}
    {deckTitles.length ? DecksList(decks, deckLengths) : <Text>Shee-it</Text>}
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
