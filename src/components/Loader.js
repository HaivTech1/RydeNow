import React from 'react';
import { View, Animated } from 'react-native';

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color1: new Animated.Value(0),
      color2: new Animated.Value(0),
      color3: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.color1, {
          toValue: 500,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(this.state.color2, {
          toValue: 500,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(this.state.color3, {
          toValue: 500,
          duration: 500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }

  render() {
    return (
        <View
            style={{
            flexDirection: 'row',
            width: 80,
            justifyContent: 'space-evenly',
            }}
        >
        <Animated.View
          style={{
            height: 15,
            width: 15,
            borderRadius: 10,
            backgroundColor: this.state.color1.interpolate({
              inputRange: [0, 500],
              outputRange: ['transparent','#FF6600'],
            }),
          }}
        />
        <Animated.View
          style={{
            height: 15,
            width: 15,
            borderRadius: 10,
            useNativeDriver: true,
            backgroundColor: this.state.color2.interpolate({
              inputRange: [0, 500],
              outputRange:  ['transparent','#FF6600'],
            }),
          }}
        />
        <Animated.View
          style={{
            height: 15,
            width: 15,
            borderRadius: 10,
            backgroundColor: this.state.color3.interpolate({
              inputRange: [0, 500],
              outputRange:   ['transparent','#FF6600'],
            }),
          }}
        />
      </View>
    );
  }
}