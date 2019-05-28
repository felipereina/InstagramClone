import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateEmail, updatePassword, updateUserName, updateBio } from '../actions/user'
import firebase from 'firebase'

class SignUp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>SignUp</Text>
        <TextInput 
            style={styles.border} 
            value={this.props.newuser}
            onChangeText={input => console.log(this.props.user)}
            placeholder='Email'
        />
        <TextInput 
            style={styles.border} 
            value={this.props.newuser}
            onChangeText={input => this.props.updatePassword(input)}
            placeholder='Password'
        />
        <TextInput 
            style={styles.border} 
            value={this.props.newuser}
            onChangeText={input => this.props.updateUserName(input)}
            placeholder='User Name'
        />
        <TextInput 
            style={styles.border} 
            value={this.props.newuser}
            onChangeText={input => this.props.updateBio(input)}
            placeholder='Bio'
        />
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Signup')}>
            <Text>SignUp</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({updateEmail, updatePassword, updateUserName, updateBio}, dispatch)
}

const mapStateToProps = (state) => {
    return { newuser: state.user}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);