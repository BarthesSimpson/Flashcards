//REACT
import React from 'react'
import { Image } from 'react-native'
import styled from 'styled-components/native'
import logo from '../../img/flashr_logo_lite.png'
import Decks from '../Decks'

//REDUX
import { connect } from 'react-redux'
import { getStoredData, clearStoredData } from '../../ducks/decks'

//STYLING
const FullScreenImage = styled.Image`
  flex: 1;
  resize-mode: contain;
`
//RENDER
const Splash = loadData => (
  <FullScreenImage
    style={{ width: null, height: null }}
    source={logo}
    onLoad={loadData}
  />
)
export const LandingScreen = ({ dataLoaded, loadData }) =>
  dataLoaded ? <Decks /> : Splash(loadData)

//CONNECT
const mapStateToProps = state => {
  return {
    dataLoaded: state.view.dataLoaded
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadData: () => {
      setTimeout(() => dispatch(getStoredData()), 1000)
      // setTimeout(() => dispatch(clearStoredData()), 1000)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen)
