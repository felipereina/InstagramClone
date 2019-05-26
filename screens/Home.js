import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import styles from '../styles'

export default class Home extends Component {
  state = {
    count: 0
  }

  add = () =>{
    let num = this.state.count + 1
    this.setState({count: num})
  }

  minus = () =>{
    let num = this.state.count - 1
    this.setState({count: num})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>How Many Apps are we going to Make: {this.state.count} </Text>
        <Button style={styles.button} title="add" onPress={() => this.add()}/>
        <Button style={styles.button} title="subtract" onPress={() => this.minus()}/>
      </View>
    );
  }
}