import React, { Component } from 'react';
import { Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateDescription, uploadPost } from '../actions/post'

class Post extends Component {

  post = () => {
    this.props.uploadPost()
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <View style={styles.container}>
          <Image style={styles.postPhoto} source={{uri: this.props.post.photo}}/> 
         <TextInput 
            style={styles.border}
            value={this.props.post.description}
            onChangeText={input => this.props.updateDescription(input)}
            placeholder='Description'
        />
          <TouchableOpacity style={styles.button} onPress={this.post}>
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
