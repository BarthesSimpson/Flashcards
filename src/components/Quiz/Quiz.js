//REACT
import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { Constants } from 'expo'
import FlipCard from 'react-native-flip-card'
import { Button, Divider } from 'react-native-material-design'
import { Icon } from 'react-native-elements'

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
  container: {
    flex: 1,
    backgroundColor: base
  },
  card: {
    backgroundColor: accent2,
    flex: 1
  },
  face: {
    backgroundColor: firebrick,
    flex: 1
  },
  back: {
    backgroundColor: accent1,
    flex: 1
  },
  cardCount: {
    paddingLeft: 12,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 12,
    color: eggyolk
  },
  cardCountBack: {
    color: darklime
  },
  question: {
    fontSize: 18,
    color: eggyolk,
    textAlign: 'center'
  },
  answer: {
    fontSize: 18,
    color: darklime,
    textAlign: 'center'
  },
  scoreButtons: {
    marginTop: 12,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: eggyolk
  },
  scoreButtonsFront: {
    backgroundColor: base
  }
})

//RENDER
class Quiz extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      flip: false,
      hasFlipped: false,
      cardNumber: 0,
      score: 0
    }
  }

  cardCount(side) {
    const { cards } = this.props
    const style =
      side === 'back'
        ? [styles.cardCount, styles.cardCountBack]
        : styles.cardCount
    return (
      <Text style={style}>{`(${this.state.cardNumber +
        1} of ${cards.length})`}</Text>
    )
  }

  flipButton() {
    return (
      <Button
        text="Flip"
        raised={true}
        overrides={{
          backgroundColor: accent2,
          textColor: darklime
        }}
        style={styles.flipButton}
        onPress={() => {
          this.setState({
            ...this.state,
            flip: !this.state.flip,
            hasFlipped: true
          })
        }}
      />
    )
  }

  score(correct) {
    const { cards, navigation } = this.props
    const { cardNumber, score } = this.state
    cardNumber === cards.length - 1
      ? console.log('argufy')
      : this.setState({
          ...this.state,
          flip: false,
          hasFlipped: false,
          cardNumber: cardNumber + 1,
          score: score + correct
        })
  }
  scoreButtons(side) {
    const containerStyle =
      side === 'front'
        ? [styles.scoreButtons, styles.scoreButtonsFront]
        : styles.scoreButtons
    return (
      <View style={containerStyle}>
        <Text style={{ textAlign: 'center' }}>Did you get it right?</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}
        >
          <Icon
            reverse
            raised
            name="check"
            color={accent1}
            reverseColor={darklime}
            onPress={() => {
              this.score(1)
            }}
          />
          <Icon
            reverse
            raised
            name="clear"
            color={side === 'front' ? firebrick : base}
            reverseColor={darklime}
            onPress={() => {
              this.score(0)
            }}
          />
        </View>
      </View>
    )
  }
  render() {
    const { deck } = this.props.navigation.state.params
    const { cards } = this.props
    return cards.length === 0 ? (
      <Text> You need to add cards before you can do a quiz! </Text>
    ) : (
      <View style={styles.container}>
        <FlipCard
          style={styles.card}
          friction={6}
          perspective={1000}
          flipHorizontal={true}
          flipVertical={false}
          flip={this.state.flip}
          clickable={false}
        >
          <View style={styles.face}>
            {this.cardCount()}
            <Text style={styles.question}>
              {cards[this.state.cardNumber].question}
            </Text>
            {this.flipButton()}
            {this.state.hasFlipped && this.scoreButtons('front')}
          </View>
          <View style={styles.back}>
            {this.cardCount('back')}
            <Text style={styles.answer}>
              {/* hide the answer of next card! */}
              {this.state.hasFlipped && cards[this.state.cardNumber].answer}
            </Text>
            {this.flipButton()}
            {this.scoreButtons()}
          </View>
        </FlipCard>
      </View>
    )
  }
}
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

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
