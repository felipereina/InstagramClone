import React, { Component } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPosts } from '../actions/post'
import Ionicons from '@expo/vector-icons/Ionicons';


class Home extends Component {
  
  componentDidMount= () =>{
    this.props.getPosts();
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
              <Image style={styles.postPhoto} source={{uri: item.postPhoto}} />
              
              <View style={styles.row}>
                <Ionicons style={{margin: 5}} name='ios-heart' size={25}/>
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
    return bindActionCreators({ getPosts }, dispatch)
}

const mapStateToProps = (state) => {
    return { post: state.post }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);