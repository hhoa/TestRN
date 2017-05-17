import React, { Component } from 'react';
import {
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import firebase from 'firebase';

import Router from './Routers';
import reducers from './reducers';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyC8KtnFGX0kFwEGQ6Jn_9SpOWYE2SoJ-cM',
      authDomain: 'udemyrn.firebaseapp.com',
      databaseURL: 'https://udemyrn.firebaseio.com',
      projectId: 'udemyrn',
      storageBucket: 'udemyrn.appspot.com',
      messagingSenderId: '51593612103'
    };

    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
