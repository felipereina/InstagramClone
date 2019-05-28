import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateEmail, updatePassword, updateUserName, updateBio, signup } from '../actions/user'
import firebase from 'firebase'

class SignUp extends Component {

  signup = () =>{
    this.props.signup()
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>SignUp</Text>
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
        />
        <TextInput 
            style={styles.border} 
            value={this.props.user}
            onChangeText={input => this.props.updateUserName(input)}
            placeholder='User Name'
        />
        <TextInput 
            style={styles.border} 
            value={this.props.user}
            onChangeText={input => this.props.updateBio(input)}
            placeholder='Bio'
        />
        <TouchableOpacity style={styles.button} onPress={() => this.signup()}>
            <Text>SignUp</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({updateEmail, updatePassword, updateUserName, updateBio, signup}, dispatch)
}

const mapStateToProps = (state) => {
    return { user: state.user}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);