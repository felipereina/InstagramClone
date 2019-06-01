import React, { Component } from 'react';
import { Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateDescription, uploadPost } from '../actions/post'

class Post extends Component {
  render() {
    return (
      <View style={styles.container}>
          <Image style={styles.postPhoto} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/instagram-clone-fa3ee.appspot.com/o/jobim%20e%20joao%20gilberto.jpg?alt=media&token=d49e4993-176c-48d3-bcb3-704c1a5ec9ea'}}/> 
         <TextInput 
            style={styles.border}
            value={this.props.post.description}
            onChangeText={input => this.props.updateDescription(input)}
            placeholder='Description'
        />
          <TouchableOpacity style={styles.button} onPress={this.props.uploadPost}>
            <Text>Post</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateDescription, uploadPost }, dispatch)
}

const mapStateToProps = (state) => {
    return { 
        post: state.post,
        user: state.user
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
