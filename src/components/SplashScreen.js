import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class SplashScreen extends Component {
  state = {
    move: false
  }

  componentWillMount() {
    setTimeout(() => { Actions.MyAuth(); }, 3000);
  }

  render() {
    if (!this.state.move) {
      return (
        <View style={styles.container}>
          <View style={{ flex: 0.36 }} />
          <View style={{ flex: 0.201 }}>
            <View style={styles.horizontalView}>
              <View style={{ flex: 0.187 }} />
              <TouchableWithoutFeedback onPress={() => Actions.MyAuth()}>
                <Image
                  style={styles.imageStyle}
                  source={require('../public/imgs/logoApp@3x.png')}
                />
              </TouchableWithoutFeedback>
              <View style={{ flex: 0.187 }} />
            </View>
          </View>
          <View style={{ flex: 0.439 }} />
        </View>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgb(255, 102, 98)',
    alignItems: 'center',
  },
  imageStyle: {
  },
  horizontalView: {
    flexDirection: 'row',
    flex: 1
  }
};

export default SplashScreen;
