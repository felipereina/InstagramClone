import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import Home from '../screens/Home'
import Search from '../screens/Search'
import Upload from '../screens/Upload'
import Profile from '../screens/Profile'
import Activity from '../screens/Activity'


const TabNavigator = createBottomTabNavigator({
  Home:{ 
      screen: Home,
      navigationOptions: {
          tabBarLabel: ' ',
          tabBarIcon: () => (
            <Ionicons name="ios-home" size={32} />
          )
      }  
    },
  Search: { 
    screen: Search,
    navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({focused}) => (
            <Ionicons name={focused ? "md-search":"ios-search"} size={32} />
          )
    }  
  },
  Upload: { 
    screen: Upload,
    navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({focused}) => (
            <Ionicons name= {focused ? "ios-add-circle" : "ios-add-circle-outline"} size={32} />
          )
    }  
  },
  Activity: { 
    screen: Activity,
    navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({focused}) => (
            <Ionicons name={focused ? "ios-heart" : "ios-heart-empty"} size={32} />
          )
    }  
  },
  Profile: { 
    screen: Profile,
    navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: () => (
            <Ionicons name="ios-person" size={32} />
          )
    }  
  },
  
});

export default createAppContainer(TabNavigator);