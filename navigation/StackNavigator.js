import React from 'react';
import HomeScreen from '../screens/Home'
import CameraScreen from '../screens/Camera'
import SearchScreen from '../screens/Search'
import PostScreen from '../screens/Post'
import ProfileScreen from '../screens/Profile'
import ActivityScreen from '../screens/Activity'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


export const HomeNavigator = createAppContainer(createStackNavigator(
    {
        Home:{ 
            screen: HomeScreen, 
            navigationOptions: ({ navigation }) => ({
                headerTitle:<Image style={{width: 120, height: 35, marginLeft: 60}} source={require('../assets/logo.jpg')} />, 
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

        Camera:{ 
            screen: CameraScreen, 
            navigationOptions: {
                header: null
            } 
        }
    }
))

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