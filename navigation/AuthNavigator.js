import React from 'react';
import { Ionicons } from '@expo/vector-icons'
import Login from '../screens/Login'
import SignupScreen from '../screens/SignUp'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { TouchableOpacity } from 'react-native'

const StackNavigator = createStackNavigator(
  {
    Login: { 
      screen: Login,
      navigationOptions: {
      	header: null
      }
    },
    Signup: { 
      screen: SignupScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Signup',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
          </TouchableOpacity>
        )
      })
    }
  }
);

export default createAppContainer(StackNavigator);