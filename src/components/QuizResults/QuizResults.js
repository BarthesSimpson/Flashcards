//REACT
import React from 'react'
import {
  TouchableOpacity,
  BackHandler,
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
  container: {
    backgroundColor: base,
    paddingTop: Constants.statusBarHeight,
    padding: 10,
    flex: 1
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
  render() {
    return (
      <View style={styles.container}>
        <Text> Holla </Text>
      </View>
    )
  }
}

export default connect()(QuizResults)
