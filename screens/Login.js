import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateEmail, updatePassword, login } from '../actions/user'
import firebase from 'firebase'

class Login extends Component {

    login = () =>{
      this.props.login()
    }

  render() {
    return (
      <View style={styles.container}>
        <TextInput 
            style={styles.border}
            value={this.props.user}
            onChangeText={input => this.props.updateEmail(input)}
            placeholder='Email'
        />
        <TextInput
            style={styles.border} 
            value={this.props.user}
            onChangeText={input => this.props.updatePassword(input)}
            placeholder='Password'
            secureTextEntry={true}
        />
         <TouchableOpacity style={styles.button} onPress={() => this.login()}>
            <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Signup')}>
            <Text>SignUp</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({updateEmail, updatePassword, login}, dispatch)
}

const mapStateToProps = (state) => {
    return { user: state.user}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);