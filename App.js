import React from "react"
import { StyleSheet, Text, View } from "react-native"
import styled from "styled-components/native"
import { TabNavigator } from "react-navigation"

const StyledView = styled.View`background-color: papayawhip;`

const Hello = () => (
  <StyledView>
    <Text>Hello!</Text>
  </StyledView>
)

const Goodbye = () => (
  <StyledView>
    <Text>Goodbye!</Text>
  </StyledView>
)

const Tabs = TabNavigator({
  Hello: {
    screen: Hello
  },
  Goodbye: {
    screen: Goodbye
  }
})

export default class App extends React.Component {
  render() {
    return <Tabs />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})
