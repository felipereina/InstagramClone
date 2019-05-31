import React, { Component } from 'react';
import SwitchNavigator from './navigation/SwitchNavigator'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import reducer from './reducers/index.js'
import Logger from 'redux-logger'
import thunkMiddleWare from 'redux-thunk'
import firebase from './config/firebase'
const middleWare = applyMiddleware(thunkMiddleWare)
const store = createStore(reducer, middleWare)
console.disableYellowBox = true

 export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SwitchNavigator/>
      </Provider>

    );
  }
}