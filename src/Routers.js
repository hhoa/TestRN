import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import SplashScreen from './components/SplashScreen';
import Authentication from './components/Authentication';
import Home from './components/Home';

class RouterComponent extends Component {

  render() {
    return (
      <Router>
        <Scene key="Splash">
          <Scene key="splash" component={SplashScreen} hideNavBar />
        </Scene>

        <Scene key="MyAuth">
          <Scene key="login" component={Authentication} hideNavBar />
        </Scene>

        <Scene key="Main">
          <Scene
            key="home"
            component={Home}
            leftButtonImage={require('./public/imgs/icMenu@3x.png')}
            leftButtonIconStyle={{ padding: 12 }}
            onLeft={() => {}}
            rightButtonImage={require('./public/imgs/icFilter@3x.png')}
            rightButtonIconStyle={{ padding: 12, marginRight: 42, marginBottom: 14 }}
            onRight={() => {}}
            rightTitle='Filter'
            rightButtonTextStyle={{ color: 'rgb(50, 50, 50)' }}
          />
        </Scene>
      </Router>
    );
  }
}

export default RouterComponent;
