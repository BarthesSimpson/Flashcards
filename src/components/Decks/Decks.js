//REACT
import React from 'react'
import {
  TouchableOpacity,
  Image,
  View,
  FlatList,
  Text,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { NavigationActions } from 'react-navigation'

//REDUX
import { connect } from 'react-redux'
import { getDeckLengths, removeDeck } from '../../ducks/decks'

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
    marginBottom: 1,
    flexDirection: 'row'
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

//TODO: add a confirm delete deck dialog
//TODO: delete all cards (or do something with them) when parent deck is deleted
const DecksList = (decks, deckLengths, navigation, deleteDeck, state) => {
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Image style={{ flex: 0.3, backgroundColor: base }} source={flashdance} />
      <View style={styles.container}>
        <FlatList
          data={Object.keys(decks).map(k => ({ deck: k, key: k }))}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Deck', { deck: decks[item.deck] })
              }}
              style={styles.deckbox}
            >
              <View style={{ flex: 0.9 }}>
                <Text style={styles.deckTitle}>{item.deck}</Text>
                <Text style={styles.cardCount}>{`(${deckLengths[
                  item.deck
                ]} cards)`}</Text>
              </View>
              <View
                style={{
                  flex: 0.1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Icon
                  name="close"
                  size={20}
                  onPress={e => {
                    e.stopPropagation()
                    deleteDeck(item.deck, state)
                  }}
                  style={{ flexDirection: 'row' }}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}

//RENDER
export const Decks = ({
  decks,
  deckLengths,
  deckTitles,
  navigation,
  screenProps,
  deleteDeck,
  state
}) => {
  console.log({ screenProps, navigation })
  console.log(screenProps.navigation)
  return (
    <View style={styles.card}>
      {deckTitles.length ? (
        DecksList(decks, deckLengths, navigation, deleteDeck, state)
      ) : (
        <Text>You don't have any decks yet!</Text>
      )}
      <TouchableOpacity
        onPress={() => screenProps.rootNavigation.navigate('NewDeck')}
        style={[styles.deckbox, styles.adder]}
      >
        <Text style={[styles.deckTitle, styles.adderText]}>Add a Deck</Text>
      </TouchableOpacity>
    </View>
  )
}
//CONNECT
const mapStateToProps = state => {
  return {
    decks: state.decks,
    deckLengths: getDeckLengths(state),
    deckTitles: Object.keys(state.decks),
    state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteDeck: (id, state, next) => dispatch(removeDeck(id, state, next))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks)
