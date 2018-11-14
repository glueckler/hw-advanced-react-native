import React, { Component } from 'react'
import { View, PanResponder, Animated } from 'react-native'

export default class Deck extends Component {
  constructor(props) {
    super(props)
    
    // note we don't really use pan responder with state
    // you might see this in the docs..
    // but we'll never set state and update the pan responder
    this.panResponder = PanResponder.create({
      // executed anytime a user touches the screen
      onStartShouldSetPanResponder: () => {
        // if we return true, this panResponder instance is
        // responsible for handling the gesture
        return true
      },
      // called anytime the user drags finger
      onPanResponderMove: (event, gesture) => {
        console.log(gesture)
      },
      onPanResponderRelease: () => {
        console.log('released') 
      }
    })
  }

  renderCards() {
    return this.props.data.map(item => this.props.renderCard(item))
  }

  render() {
    return <View {...this.panResponder.panHandlers}>{this.renderCards()}</View>
  }
}
