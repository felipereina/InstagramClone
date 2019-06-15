import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateEmail, updatePassword, login, getUser, facebookLogin } from '../actions/user'
import firebase from 'firebase'


class Login extends Component {

    componentDidMount = () =>{
      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          this.props.getUser(user.uid, 'LOGIN')
          if(this.props.user != null){
            this.props.navigation.navigate('Home')
          }
        }``
      })
    }

  render() {
    return (
      <View style={[styles.container, styles.center]}>
        <Image style={{width: 300, height: 100}} source={require('../assets/logo.jpg')} />
        <TextInput 
            style={styles.border}
            value={this.props.user.email}
            onChangeText={input => this.props.updateEmail(input)}
            placeholder='Email'
        />
        <TextInput
            style={styles.border} 
            value={this.props.user.password}
            onChangeText={input => this.props.updatePassword(input)}
            placeholder='Password'
            secureTextEntry={true}
        />
         <TouchableOpacity style={styles.button} onPress={() => this.props.login()}>
            <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.facebookButton} onPress={() => this.props.facebookLogin()}>
            <Text>Facebook Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
            <Text>SignUp</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({updateEmail, updatePassword, login, facebookLogin, getUser}, dispatch)
}

const mapStateToProps = (state) => {
    return { user: state.user}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);