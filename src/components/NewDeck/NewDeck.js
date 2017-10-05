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
import { getDeckLengths } from '../../ducks/decks'

//STYLING
import {
  eggyolk,
  firebrick,
  base,
  accent1,
  accent2,
  darklime
} from '../../common/constants/colors.js'

var styles = StyleSheet.create({
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
  formcontainer: {
    // paddingLeft: 1,
    // paddingRight: 1,
    flex: 1,
    alignSelf: 'center'
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

const newDeckModel = t.struct({
  name: t.String,
  description: t.String
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
class NewDeck extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.formcontainer}> */}
        <Text style={styles.title}> Add a deck </Text>
        <KeyboardAvoidingView>
          <Form
            ref="form"
            type={newDeckModel}
            options={options}
            stylesheet={stylesheet}
          />
          <TouchableOpacity onPress={() => {}} style={styles.button}>
            <Text style={styles.buttonText}> Add Deck </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        {/* </View> */}
      </View>
    )
  }
}

export default NewDeck
