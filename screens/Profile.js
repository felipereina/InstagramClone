import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import styles from '../styles'
import { connect } from 'react-redux'
import firebase from 'firebase'


class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
        <Text>{this.props.user.username}</Text>
        <Text>{this.props.user.bio}</Text>
        <Text>{this.props.user.email}</Text>
        <Button title="Logout" onPress={() => firebase.auth().signOut()}/>
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