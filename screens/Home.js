import React, { Component } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPosts, likePost, unlikePost } from '../actions/post'
import Ionicons from '@expo/vector-icons/Ionicons';


class Home extends Component {

  componentDidMount= () =>{
    this.props.getPosts();
  }
  
  likePost = (post) => {
    const { uid } = this.props.user
    if(post.likes.includes(uid)){
      this.props.unlikePost(post)
    } else{
      this.props.likePost(post)
    }

  }
  
  navigateMap = (item) => {
    this.props.navigation.navigate('Map',
     { location: item.postLocation })
  }

  render() {
    if(this.props.post === null) return null
    return (
      <View style={styles.container}>
        <FlatList
          data = {this.props.post.feed}
          renderItem = {({item}) => (
            <View>
              <View style={[styles.row, styles.center]}>
                <View style={[styles.row, styles.center]}>
                  <Image style={styles.roundImage} source={{uri: item.photo}} />
                  <Text>{item.username}</Text>
                  <View>
                    <TouchableOpacity onPress={() => this.navigateMap(item)}>
                      <Text>{item.postLocation ? item.postLocation.name : null}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Ionicons style={{margin: 5}} name='ios-flag' size={25}/>
              </View>
              <TouchableOpacity onPress={() => this.likePost(item)}>
              <Image style={styles.postPhoto} source={{uri: item.postPhoto}} />
              </TouchableOpacity>
              <View style={styles.row}>
                <Ionicons style={{margin: 5}} name={item.likes.includes(this.props.user.uid) ? 'ios-heart' : 'ios-heart-empty'} size={25}/>
                <Ionicons style={{margin: 5}} name='ios-chatbubbles' size={25}/>
                <Ionicons style={{margin: 5}} name='ios-send' size={25}/>
              </View>

              <Text>{item.postDescription}</Text>

            </View>
          )}
        />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getPosts, likePost, unlikePost }, dispatch)
}

const mapStateToProps = (state) => {
    return { 
      post: state.post,
      user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);