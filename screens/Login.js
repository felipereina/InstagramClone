import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '../styles'
import { connect } from 'react-redux'


export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
      </View>
    );
  }
}