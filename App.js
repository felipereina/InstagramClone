import React, { Component } from 'react';
import SwitchNavigator from './navigation/SwitchNavigator'
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import reducer from './reducers/index.js'

const store = createStore(reducer)

 export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SwitchNavigator/>
      </Provider>

    );
  }
}