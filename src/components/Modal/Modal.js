import React from 'react'
import { StackNavigator } from 'react-navigation'
import Navigator from '../Navigator'
import NewDeck from '../NewDeck'

//STYLING
import { accent2, base, darklime } from '../../common/constants/colors'
const styleSettings = {
  headerStyle: {
    backgroundColor: accent2
  },
  headerBackTitleStyle: {
    color: darklime
  },
  headerTintColor: darklime
}

const ModalNavigator = StackNavigator(
  {
    MainNavigator: {
      screen: ({ navigation }) => (
        <Navigator screenProps={{ rootNavigation: navigation }} />
      )
    },
    NewDeck: { screen: NewDeck, ...styleSettings }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
)

export default () => <ModalNavigator />
