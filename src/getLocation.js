/* eslint no-console: 0 */
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

class GeolocationExample extends Component {
  state={
    initialPosition: 'unknown',
    lastPosition: 'unknown',
  };

  componentWillMount() {
    watchID: (null: ?number);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let initialPosition = JSON.stringify(position);
        this.setState({ initialPosition });
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      let lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View>
        <Text>
          <Text style={styles.title}>Initial position: </Text>
          {this.state.initialPosition}
        </Text>
        <Text>
          <Text style={styles.title}>Current position: </Text>
          {this.state.lastPosition}
        </Text>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
});

export default GeolocationExample;
