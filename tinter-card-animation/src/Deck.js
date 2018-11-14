import React, { Component } from 'react'
import { View, PanResponder, Animated } from 'react-native'

export default class Deck extends Component {
  constructor(props) {
    super(props)

    // keep track of the card position
    this.position = new Animated.ValueXY()

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
        this.position.setValue({ x: gesture.dx, y: gesture.dy })
      },
      onPanResponderRelease: () => {
        console.log('released')
      },
    })
  }

  getCardStyle() {
    const rotate = this.position.x.interpolate({
      inputRange: [-500, 0, 500],
      outputRange: ['-120deg', '0deg', '120deg'],
    })
    return {
      ...this.position.getLayout(),
      transform: [{ rotate }],
    }
  }

  renderCards() {
    return this.props.data.map((item, index) => {
      if (index === 0) {
        return (
          <Animated.View
            style={this.getCardStyle()}
            key={item.id}
            {...this.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        )
      }
    })
  }

  render() {
    return <View>{this.renderCards()}</View>
  }
}
