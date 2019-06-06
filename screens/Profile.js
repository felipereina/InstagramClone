import React, { Component } from 'react';
import { Text, View, Button, Image, TouchableOpacity } from 'react-native';
import styles from '../styles'
import { connect } from 'react-redux'
import firebase from 'firebase'


class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
        <Image style={styles.roundImage} source={{uri: this.props.user.photo}}/>
        <Text>{this.props.user.username}</Text>
        <Text>{this.props.user.bio}</Text>
        <Text>{this.props.user.email}</Text>
        <TouchableOpacity style={styles.buttonSmall} onPress={() => this.props.navigation.navigate('Edit')}>
          <Text style={styles.bold}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSmall} onPress={() => firebase.auth().signOut()} >
          <Text style={styles.bold}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

/* const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch)
}
 */
const mapStateToProps = (state) => {
    return { user: state.user}
}

export default connect(mapStateToProps)(Profile);