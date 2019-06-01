import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import Home from '../screens/Home'
import Search from '../screens/Search'
import Post from '../screens/Post'
import Profile from '../screens/Profile'
import Activity from '../screens/Activity'
import { HomeNavigator, SearchNavigator, ProfileNavigator, ActivityNavigator, PostNavigator } from './StackNavigator'


const TabNavigator = createBottomTabNavigator({
  Home:{ 
      screen: HomeNavigator,
      navigationOptions: {
          tabBarLabel: ' ',
          tabBarIcon: () => (
            <Ionicons name="ios-home" size={32} />
          )
      }  
    },
  Search: { 
    screen: SearchNavigator,
    navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({focused}) => (
            <Ionicons name={focused ? "md-search":"ios-search"} size={32} />
          )
    }  
  },
  Post: { 
    screen: PostNavigator,
    navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({focused}) => (
            <Ionicons name= {focused ? "ios-add-circle" : "ios-add-circle-outline"} size={32} />
          )
    }  
  },
  Activity: { 
    screen: ActivityNavigator,
    navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({focused}) => (
            <Ionicons name={focused ? "ios-heart" : "ios-heart-empty"} size={32} />
          )
    }  
  },
  Profile: { 
    screen: ProfileNavigator,
    navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: () => (
            <Ionicons name="ios-person" size={32} />
          )
    }  
  },
  
});

export default createAppContainer(TabNavigator);