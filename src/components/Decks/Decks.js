//REACT
import React from 'react'
import {
  TouchableOpacity,
  Image,
  View,
  // FlatList,
  Text,
  StyleSheet
} from 'react-native'
import { NavigationActions } from 'react-navigation'

//REDUX
import { connect } from 'react-redux'
import { getDeckLengths } from '../../ducks/decks'

//STYLING
import flashdance from '../../img/flashdance.png'
import {
  accent1,
  base,
  eggyolk,
  firebrick,
  darklime
} from '../../common/constants/colors.js'

const styles = StyleSheet.create({
  adder: {
    backgroundColor: accent1,
    marginBottom: 0
  },
  adderText: {
    color: darklime
  },
  card: {
    backgroundColor: base,
    flex: 1
  },
  container: {
    backgroundColor: darklime,
    flex: 0.7
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

//TODO: change the container View to a FlatList (once I fix the SDK bug )
const DecksList = (decks, deckLengths, navigation) => {
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Image style={{ flex: 0.3, backgroundColor: base }} source={flashdance} />
      <View style={styles.container}>
        {Object.keys(decks).map(d => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Deck', { deck: decks[d] })}
              style={styles.deckbox}
              key={d}
            >
              <Text style={styles.deckTitle}>{d}</Text>
              <Text style={styles.cardCount}>{`(${deckLengths[
                d
              ]} cards)`}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const DeckAdder = navigation => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('NewDeck')}
      style={[styles.deckbox, styles.adder]}
    >
      <Text style={[styles.deckTitle, styles.adderText]}>Add a Deck</Text>
    </TouchableOpacity>
  )
}

//RENDER
export const Decks = ({
  decks,
  deckLengths,
  deckTitles,
  navigation,
  screenProps
}) => {
  console.log({ screenProps, navigation })
  return (
    <View style={styles.card}>
      {deckTitles.length ? (
        DecksList(decks, deckLengths, navigation)
      ) : (
        <Text>You don't have any decks yet!</Text>
      )}
      {DeckAdder(screenProps.rootNavigation)}
    </View>
  )
}
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
