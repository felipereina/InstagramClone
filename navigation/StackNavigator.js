import React from 'react';
import HomeScreen from '../screens/Home'
import SearchScreen from '../screens/Search'
import PostScreen from '../screens/Post'
import ProfileScreen from '../screens/Profile'
import ActivityScreen from '../screens/Activity'
import { createStackNavigator, createAppContainer } from 'react-navigation';

export const HomeNavigator = createAppContainer(createStackNavigator(
    {
        Home:{ 
            screen: HomeScreen, 
            navigationOptions: {
                title: 'Home'
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