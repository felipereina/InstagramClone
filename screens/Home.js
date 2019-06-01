import React, { Component } from 'react';
import { Text, View, Image, ScrollView, FlatList } from 'react-native';
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPosts } from '../actions/post'


class Home extends Component {
  
  componentDidMount= () =>{
    this.props.getPosts();
  }

  render() {
    if(this.props.post === null) return null
    return (
      <View style={styles.container}>
        <FlatList
          data = {this.props.post.feed}
          renderItem = {({item}) => (
            <View>
                <Image style={styles.postPhoto} source={{uri: item.postPhoto}} />
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