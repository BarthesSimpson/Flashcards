//REACT
import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'

//REDUX
import { connect } from 'react-redux'

//STYLING
import { eggyolk, firebrick, darklime } from '../../common/constants/colors.js'

var styles = StyleSheet.create({
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
  }
})
// const DecksContainer = styled.View`background-color: ${firebrick};`
const DecksList = decks => {
  return (
    <View style={styles.container}>
      {Object.keys(decks).map(d => {
        return (
          <TouchableOpacity onPress={() => {}} style={styles.deckbox} key={d}>
            <Text style={styles.deckTitle}>{d}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

//RENDER
export const Decks = ({ deckTitles, decks }) => (
  <View>{deckTitles.length ? DecksList(decks) : <Text>Shee-it</Text>}</View>
)
// export const Decks = ({ deckTitles, decks }) => {
//   console.log(decks)
//   return <View>{DecksList(decks)}</View>
// }

//CONNECT
const mapStateToProps = state => {
  return {
    decks: state.decks,
    deckTitles: Object.keys(state.decks)
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks)
