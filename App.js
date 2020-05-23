/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import { PersistGate } from 'redux-persist/lib/integration/react';
import reducers from './src/reducers';
import Router from './src/Router';
import { Spinner } from './src/components/common';
import { store, persistor } from './src/configureStore';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    const config = {
      apiKey: 'AIzaSyBosgnqeOclQ9CupNf2gP2OwevDNEq3c7c',
      // authDomain: "project-id.firebaseapp.com",
      databaseURL: 'https://eattotest.firebaseio.com',
      // projectId: "project-id",
      // storageBucket: "project-id.appspot.com",
      // messagingSenderId: "sender-id",
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

  render() {
    //const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <Router />
        </PersistGate>        
      </Provider> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
