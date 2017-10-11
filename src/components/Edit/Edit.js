//REACT
import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { Constants } from 'expo'

//REDUX
import { connect } from 'react-redux'
import { getCards } from '../../ducks/cards'

//STYLING

//RENDER
export const Edit = ({ navigation, cards }) => (
  <View>
    <Text>{navigation.state.params.deck.id}</Text>
    {cards.map(c => <Text key={c.id}>{c.question}</Text>)}
  </View>
)

//CONNECT
const mapStateToProps = (state, props) => {
  const deck = props.navigation.state.params.deck.id
  return {
    cards: getCards(deck)(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)
