//REACT
import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { Constants } from 'expo'
import FlipCard from 'react-native-flip-card'

//REDUX
import { connect } from 'react-redux'

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
    flex: 1
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
  }
})

//RENDER
class Quiz extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      flip: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ flip: true })
    }, 1000)
  }
  render() {
    return (
      <View style={styles.container}>
        <FlipCard
          style={styles.card}
          friction={6}
          perspective={1000}
          flipHorizontal={true}
          flipVertical={false}
          flip={this.state.flip}
          clickable={false}
          onFlipEnd={isFlipEnd => {
            console.log('isFlipEnd', isFlipEnd)
          }}
        >
          <View style={styles.face}>
            <Text>The Face</Text>
          </View>
          <View style={styles.back}>
            <Text>The Back</Text>
          </View>
        </FlipCard>
      </View>
    )
  }
}
//CONNECT
const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
