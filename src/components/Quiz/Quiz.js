//REACT
import React from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native'
import { Constants } from 'expo'

//REDUX
import { connect } from 'react-redux'

//STYLING

//RENDER
export const Quiz = ({ navigation }) => (
  <View>
    <Text>{navigation.state.params.deck.id}</Text>
  </View>
)

//CONNECT
const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
