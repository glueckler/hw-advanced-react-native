import React, { Component } from 'react'
import { View, PanResponder, Animated, Dimensions } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = SCREEN_WIDTH / 4
const SWIPE_OUT_DURATION = 250

export default class Deck extends Component {
  static defaultProps = {
    onSwipeLeft() {},
    onSwipeRight() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      // keep track of the current card
      index: 0,
    }

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
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('RIGHT')
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('LEFT')
        } else {
          this.resetPosition()
        }
      },
    })
  }

  getCardStyle() {
    const rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    })
    return {
      ...this.position.getLayout(),
      transform: [{ rotate }],
    }
  }

  resetPosition() {
    Animated.spring(this.position, {
      toValue: { x: 0, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start()
  }

  forceSwipe(direction) {
    Animated.timing(this.position, {
      toValue: { x: direction === 'LEFT' ? -SCREEN_WIDTH : SCREEN_WIDTH, y: 0 },
      duration: 250,
    }).start(() => {
      this.onSwipeComplete(direction)
    })
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight } = this.props
    const { item } = this.state

    direction === 'LEFT' ? onSwipeLeft() : onSwipeRight()
    this.setState({ index: this.state.index + 1 })
    this.position.setValue({ x: 0, y: 0 })
  }

  renderCards() {
    return this.props.data.map((item, index) => {
      if (index < this.state.index) return null

      if (index === this.state.index) {
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
      return this.props.renderCard(item)
    })
  }

  render() {
    return <View>{this.renderCards()}</View>
  }
}
