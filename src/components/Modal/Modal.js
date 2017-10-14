import React from 'react'
import { StackNavigator } from 'react-navigation'
import Navigator from '../Navigator'
import NewDeck from '../NewDeck'
import UpsertCard from '../UpsertCard'
import QuizResults from '../QuizResults'
import { Constants } from 'expo'
import Icon from 'react-native-vector-icons/FontAwesome'

//PARTIALS
const CancelButt = ({ navigation }) => (
  <Icon name="close" size={20} onPress={() => navigation.goBack(null)} />
)

//STYLING
import { base } from '../../common/constants/colors'

const ModalNavigator = StackNavigator(
  {
    MainNavigator: {
      navigationOptions: ({ navigation }) => ({
        header: false
      }),
      screen: ({ navigation }) => (
        <Navigator screenProps={{ rootNavigation: navigation }} />
      )
    },
    NewDeck: { screen: NewDeck },
    UpsertCard: { screen: UpsertCard },
    QuizResults: { screen: QuizResults }
  },
  {
    mode: 'modal',
    headerMode: 'screen',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: base,
        paddingTop: Constants.statusBarHeight,
        paddingLeft: Constants.statusBarHeight
      },
      headerLeft: CancelButt({ navigation })
    })
  }
)

export default () => <ModalNavigator />
