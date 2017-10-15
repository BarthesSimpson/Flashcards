//REACT
import React from 'react'
import {
  TouchableOpacity,
  BackHandler,
  TouchableHighlight,
  FlatList,
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'
import { Constants } from 'expo'
import Icon from 'react-native-vector-icons/FontAwesome'

//REDUX
import { connect } from 'react-redux'
import { getCards, removeCard, upsertCard } from '../../ducks/cards'

//STYLING
import shebang from '../../img/shebang.png'
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
    backgroundColor: base,
    paddingTop: Constants.statusBarHeight,
    paddingTop: 30,
    flex: 1
  },
  scoreContainer: {
    flex: 0.5,
    justifyContent: 'center',
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  scoreText: {
    fontSize: 38,
    color: darklime,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  messageText: {
    fontSize: 24,
    color: eggyolk,
    textAlign: 'center',
    marginTop: 10
  },
  buttons: {
    marginTop: 10,
    marginBottom: 10
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
class QuizResults extends React.Component {
  static navigationOptions = {
    header: null
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      console.log('not so fast!')
      return true
    })
  }
  buttons() {
    const { navigation } = this.props
    const { deck } = navigation.state.params
    return (
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{`Take ${deck.id} Quiz Again`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log('aboogly')
            navigation.navigate('MainNavigator')
          }}
          style={[styles.button, styles.liteButton]}
        >
          <Text style={[styles.buttonText, styles.liteButtonText]}>
            Go Home
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
  render() {
    const { deck, score, cards } = this.props.navigation.state.params
    const quizLength = cards.length
    const ratio = score / quizLength
    const message =
      ratio > 0.8
        ? 'Way to go!'
        : ratio > 0.5 ? 'Keep working!' : "Don't give up!"
    return (
      <View style={styles.container}>
        <Text style={styles.messageText}>{message}</Text>
        <Image style={styles.scoreContainer} source={shebang}>
          <Text style={styles.scoreText}>{`${score} / ${quizLength}`}</Text>
        </Image>
        {this.buttons()}
      </View>
    )
  }
}

export default connect()(QuizResults)
