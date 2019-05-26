import React from 'react';
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import { createStackNavigator, createAppContainer } from 'react-navigation';

const StackNavigator = createStackNavigator({

    Login:{ 
        screen: Login,  
    },
    
    Signup:{ 
        screen: SignUp,  
      },  
});

export default createAppContainer(StackNavigator);