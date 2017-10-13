//REACT
import React from 'react'
import {
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  View,
  Text,
  StyleSheet
} from 'react-native'
import { Constants } from 'expo'
import Icon from 'react-native-vector-icons/FontAwesome'

//REDUX
import { connect } from 'react-redux'
import { getCards, removeCard, upsertCard } from '../../ducks/cards'

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
  miniCard: {
    backgroundColor: firebrick,
    flexDirection: 'row',
    alignSelf: 'stretch',
    padding: 10,
    marginBottom: 1
  },
  questionText: {
    fontSize: 16,
    fontWeight: '400',
    color: eggyolk
  },
  answerText: {
    fontSize: 14
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

//RENDER
//TODO: Add batch delete and delete confirmation dialog
export const Edit = ({
  screenProps,
  navigation,
  deck,
  cards,
  state,
  deleteCard
}) => (
  <View style={{ backgroundColor: base, flex: 1 }}>
    <TouchableOpacity
      onPress={() =>
        screenProps.rootNavigation.navigate('UpsertCard', { deck })}
      style={[styles.button, styles.liteButton]}
    >
      <Text style={[styles.buttonText, styles.liteButtonText]}>Add a Card</Text>
    </TouchableOpacity>
    <FlatList
      data={cards.map(c => ({ ...c, key: c.id }))}
      renderItem={({ item }) => {
        console.log({ item })
        return (
          <View style={styles.miniCard}>
            <View style={{ flex: 0.8 }}>
              <Text style={styles.questionText}>{item.question}</Text>
              <Text style={styles.answerText}>{item.answer}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 0.2
              }}
            >
              <Icon.Button
                name="pencil-square-o"
                size={16}
                color={darklime}
                backgroundColor={firebrick}
                style={{ flex: 0.5 }}
                onPress={() =>
                  screenProps.rootNavigation.navigate('UpsertCard', {
                    deck,
                    oldCard: item
                  })}
              />

              <Icon.Button
                name="minus-circle"
                size={16}
                color={darklime}
                backgroundColor={firebrick}
                style={{ flex: 0.5 }}
                onPress={() => deleteCard(item.id, state)}
              />
            </View>
          </View>
        )
      }}
    />
  </View>
)

//CONNECT
const mapStateToProps = (state, props) => {
  const deck = props.navigation.state.params.deck.id
  return {
    deck,
    state,
    cards: getCards(deck)(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteCard: (id, state, next) => dispatch(removeCard(id, state, next))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)
