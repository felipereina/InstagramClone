import React, { Component } from 'react';
import { Text, View, FlatList, ActivityIndicator, Image } from 'react-native';
import styles from '../styles'
import { connect } from 'react-redux'
import db from '../config/firebase';
import orderBy from 'lodash/orderBy' 

class Activity extends Component {

  state = {
    activity: []
  }

  componentDidMount = () =>{
    this.getActivity()
  }

  getActivity = async () => {
    let activity = []
    const query = await db.collection('activity').where('uid', '==', this.props.user.uid).get()
    query.forEach((response) => {
        activity.push(response.data())
    })
    this.setState({activity: activity})
  }

  render() {
    if(this.state.activity.length <= 0) return <ActivityIndicator style={styles.container}/>
    return (
      <View style={{flex: 1}}>
        <FlatList
          data = {this.state.activity}
          keyExtractor = {(item) => JSON.stringify(item.date)}
          renderItem = {({item}) =>{
            return(
              <View style={[styles.row, styles.center]}>
                <Image style={styles.roundImage} source={{uri: item.likerPhoto}}/>
                  <View>
                    <Text>{item.likerName}</Text>
                    <Text>Liked Your Photo</Text>
                  </View>
                    <Image style={styles.roundImage} source={{uri: item.postPhoto}}/>
              </View>
            )}}
        />
      </View>
    );
  }
}

/* const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch)
} */

const mapStateToProps = (state) => {
    return {user: state.user}
}

export default connect(mapStateToProps)(Activity);

