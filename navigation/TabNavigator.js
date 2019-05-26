import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Home from '../screens/Home'
import Search from '../screens/Search'
import Upload from '../screens/Upload'
import Profile from '../screens/Profile'
import Activity from '../screens/Activity'


const TabNavigator = createBottomTabNavigator({
  Home: Home,
  Search: Search,
  Upload: Upload,
  Activity: Activity,
  Profile: Profile
  
});

export default createAppContainer(TabNavigator);