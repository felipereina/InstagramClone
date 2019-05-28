import React from 'react';
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import { createStackNavigator, createAppContainer } from 'react-navigation';

const StackNavigator = createStackNavigator({

    Login:{ 
        screen: Login, 
        navigationOptions: {
            header: null
        } 
    },
    
    Signup:{ 
        screen: SignUp,  
      },  
});

export default createAppContainer(StackNavigator);