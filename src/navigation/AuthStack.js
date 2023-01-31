import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Signup from '../screens/auth/Signup';
import Verification from '../screens/auth/Verification';
import Onboarding from '../screens/Onboarding';
import Login from '../screens/auth/Login';
import SignupVerification from '../screens/auth/SignupVerification';

const Auth = createStackNavigator();

const AuthStack = () => {
  return (
    <Auth.Navigator initialRouteName='OnboardingScreen' screenOptions={{ headerShown: false }}>
        <Auth.Screen 
            name="OnboardingScreen" 
            component={Onboarding}
            options={{ 
                headerShown:false,
            }} 
        />
        <Auth.Screen 
            name="LoginScreen" 
            component={Login}
            options={{ 
            headerShown:false,
            }} 
        />
        <Auth.Screen 
            name="SignupVerification" 
            component={SignupVerification} 
            options={{ 
                headerShown:false,
            }}
        />
        <Auth.Screen 
            name="SignupScreen" 
            component={Signup}
            options={{ 
                headerShown:false,
            }} 
        />
        <Auth.Screen 
            name="VerificationScreen" 
            component={Verification}
                options={{ 
                headerShown:false,
            }} 
        />
    </Auth.Navigator>
  )
}

export default AuthStack