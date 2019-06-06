import React from 'react';
import HomeScreen from '../screens/Home'
import CameraScreen from '../screens/Camera'
import SearchScreen from '../screens/Search'
import PostScreen from '../screens/Post'
import ProfileScreen from '../screens/Profile'
import ActivityScreen from '../screens/Activity'
import MapScreen from '../screens/Map'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from '../styles';


export const HomeNavigator = createAppContainer(createStackNavigator(
    {
        Home:{ 
            screen: HomeScreen, 
            navigationOptions: ({ navigation }) => ({
                headerTitle:<Image style={{width: 120, height: 35}} source={require('../assets/logo.jpg')} />, 
                headerLeft: (
                    <TouchableOpacity onPress={()=> navigation.navigate('Camera')}>
                        <Ionicons style={{marginLeft: 10}} name={'ios-camera'} size={30}/>
                    </TouchableOpacity>),
                headerRight: (
                    <TouchableOpacity onPress={()=> console.log('Message')}>
                        <Ionicons style={{marginRight: 10}} name={'ios-send'} size={30}/>
                    </TouchableOpacity>)
                
            })
        },

        Map:{
            screen: MapScreen, 
            navigationOptions: ({navigation}) => ({
                title: 'Map',
                headerLeft: (
                    <TouchableOpacity onPress={()=> navigation.goBack()}>
                        <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
                    </TouchableOpacity>
                )
            })        
        },

        Camera:{ 
            screen: CameraScreen, 
            navigationOptions: {
                header: null
            } 
        }
    }
))

HomeNavigator.navigationOptions = ({navigation}) => {
    let tabBarVisible = true
    if(navigation.state.routes.some(route => route.routeName === 'Camera')){
        tabBarVisible = false
    }
    if(navigation.state.routes.some(route => route.routeName === 'Map')){
        tabBarVisible = false
    }
    return {
        tabBarVisible
    }
}


export const SearchNavigator = createAppContainer(createStackNavigator(
    {
        Search:{ 
            screen: SearchScreen, 
            navigationOptions: {
                title: 'Search'
            } 
        }
    }
))

export const ProfileNavigator = createAppContainer(createStackNavigator(
    {
        Profile:{ 
            screen: ProfileScreen, 
            navigationOptions: {
                title: 'Profile'
            } 
        }
    }
))

export const ActivityNavigator = createAppContainer(createStackNavigator(
    {
        Activity:{ 
            screen: ActivityScreen, 
            navigationOptions: {
                title: 'Activity'
            } 
        }
    }
))

export const PostNavigator = createAppContainer(createStackNavigator(
    {
        Post:{ 
            screen: PostScreen, 
            navigationOptions: {
                title: 'Post'
            } 
        }
    }
))