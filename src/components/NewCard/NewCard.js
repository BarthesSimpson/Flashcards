//REACT
import React from 'react'
import {
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Text,
  StyleSheet
} from 'react-native'
const t = require('tcomb-form-native')
import { Constants } from 'expo'

//REDUX
import { connect } from 'react-redux'
import { addNewCard } from '../../ducks/cards'

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
  title: {
    fontSize: 24,
    marginBottom: 10
  },
  input: {
    marginTop: 16
  },
  container: {
    backgroundColor: base,
    flex: 1
  },
  deckDescription: {
    fontSize: 16,
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

//PARTIALS
const Form = t.form.Form

const newCardModel = t.struct({
  question: t.String,
  answer: t.String
})

const s = t.form.Form.stylesheet
const stylesheet = {
  ...s,
  formGroup: {
    ...s.formGroup,
    normal: { marginBottom: 10, marginLeft: 10, marginRight: 10 }
  }
}
const biginput = {
  ...stylesheet,
  textbox: {
    ...s.textBox,
    normal: { ...s.textbox.normal, height: 100, textAlignVertical: 'top' }
  }
}
const options = {
  // auto: 'placeholders',
  fields: {
    description: {
      multiline: true,
      numberOfLines: 4,
      stylesheet: biginput
    }
  }
}

//RENDER
class NewCard extends React.Component {
  render() {
    console.log(this.props)
    const { addCard, state, navigation } = this.props
    const deck = navigation.state.params.deck
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Add a card to {deck} </Text>
        <KeyboardAvoidingView>
          <Form
            ref="form"
            type={newCardModel}
            options={options}
            stylesheet={stylesheet}
          />
          <TouchableOpacity
            onPress={() => {
              const card = this.refs.form.getValue()
              addCard(
                { ...card, deck, id: Date.now().toString() },
                deck,
                state,
                () => {
                  navigation.goBack()
                }
              )
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}> Add Card </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const mapStateToProps = state => ({ state })
const mapDispatchToProps = dispatch => ({
  addCard: (card, deck, state, next) =>
    dispatch(addNewCard(card, deck, state, next))
})
export default connect(mapStateToProps, mapDispatchToProps)(NewCard)
