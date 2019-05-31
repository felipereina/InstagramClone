import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '../styles'


export default class Post extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Post</Text>
      </View>
    );
  }
}
