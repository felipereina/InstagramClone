import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '../styles'
import { connect } from 'react-redux'


class Upload extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Upload {this.props.counter}</Text>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch)
}

const mapStateToProps = (state) => {
    return { counter: state}
}

export default connect(mapStateToProps)(Upload);