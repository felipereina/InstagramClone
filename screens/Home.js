import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { add, subtract } from '../actions/index'

class Home extends Component {
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
        <Text>Home: {this.props.counter} </Text>
        <Text>How Many Apps are we going to Make: {this.state.count} </Text>
        <Button title="add" onPress={() => this.props.add()}/>
        <Button title="subtract" onPress={() => this.props.subtract()}/>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ add, subtract }, dispatch)
}

const mapStateToProps = (state) => {
    return { counter: state.counter }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);