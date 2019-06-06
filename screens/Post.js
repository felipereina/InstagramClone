import React, { Component } from 'react';
import { FlatList, Text, View, TextInput, Image, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import styles from '../styles'
import ENV from '../env';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Location, Permissions, ImagePicker } from 'expo';
import { NavigationEvents } from 'react-navigation';
import { updateDescription, uploadPost, updateLocation, updatePhoto  } from '../actions/post'
import { uploadPhoto } from '../actions'
const GOOGLE_API = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
class Post extends Component {

  state = {
    showModal: false,
    locations: []
  }

  componentDidMount(){
    this.getLocations()
  }

  post = () => {
    this.props.uploadPost()
    this.props.navigation.navigate('Home')
  }

  onWillFocus = () => {
    if(!this.props.post.photo){
      this.openLibrary()
    }
  }

  openLibrary = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status === 'granted') {
      const image = await ImagePicker.launchImageLibraryAsync()
      if(!image.cancelled){
        const url = await this.props.uploadPhoto(image)
        this.props.updatePhoto(url)
      }
    }
  }

  setLocation = (location) => {
    const place = {
      name: location.name,
      coords: {
        lat: location.geometry.location.lat,
        lng: location.geometry.location.lng
      }
    }
    this.setState({showModal: false})
    this.props.updateLocation(place)
  }

  getLocations = async () =>{
    this.setState({showModal: true})
    const permission = await Permissions.askAsync(Permissions.LOCATION)
    if(permission.status === 'granted'){
      const location = await Location.getCurrentPositionAsync();
      const url = `${GOOGLE_API}?location=${location.coords.latitude},${location.coords.longitude}&rankby=distance&key=${ENV.googleApiKey}`
      const response = await fetch(url)
      const data = await response.json()
      this.setState({locations: data.results})
    }

  }

  modal = () => {
    return(
      <Modal animationType='slide' transparent={false} visible={this.state.showModal}>
        <SafeAreaView  style={[styles.container, styles.center]}>
          <FlatList 
            keyExtractor={(item) => item.id}
            data = {this.state.locations}
            renderItem= {({item}) =>(
                <TouchableOpacity style={styles.border} onPress={() => this.setLocation(item)}>
                <Text style={styles.gray}>{item.name}</Text>
                <Text style={styles.gray}>{item.vicinity}</Text>
                </TouchableOpacity>
            )}/>
        </SafeAreaView>
      </Modal>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this.onWillFocus}/>
        {this.modal()}
          <Image style={styles.postPhoto} source={{uri: this.props.post.photo}}/> 
         <TextInput 
            style={styles.border}
            value={this.props.post.description}
            onChangeText={input => this.props.updateDescription(input)}
            placeholder='Description'
        />
         {
          this.state.locations.length > 0 ?        
          <TouchableOpacity style={styles.border} onPress={() => this.setState({ showModal: true })}>
            <Text style={styles.gray}>{this.props.post.location ? this.props.post.location.name : 'Add a Location'}</Text>
          </TouchableOpacity> : null
        }
        <TouchableOpacity style={styles.button} onPress={this.post}>
            <Text>Post</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateDescription, uploadPost, updateLocation, uploadPhoto, updatePhoto }, dispatch)
}

const mapStateToProps = (state) => {
    return { 
        post: state.post,
        user: state.user
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
