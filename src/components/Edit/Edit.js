//REACT
import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { Constants } from 'expo'

//REDUX
import { connect } from 'react-redux'
import { getCards } from '../../ducks/cards'

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

//RENDER
export const Edit = ({ screenProps, navigation, deck, cards }) => (
  <View>
    <Text>{navigation.state.params.deck.id}</Text>
    {cards.map(c => <Text key={c.id}>{c.question}</Text>)}
    <TouchableOpacity
      onPress={() => screenProps.rootNavigation.navigate('NewCard', { deck })}
      style={[styles.button, styles.liteButton]}
    >
      <Text style={[styles.buttonText, styles.liteButtonText]}>Add a Card</Text>
    </TouchableOpacity>
  </View>
)

//CONNECT
const mapStateToProps = (state, props) => {
  const deck = props.navigation.state.params.deck.id
  return {
    deck,
    cards: getCards(deck)(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)
