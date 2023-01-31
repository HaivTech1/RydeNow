import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import LoadingScreen from '../screens/LoadingScreen';
import useApp from '../contexts/context';

export default function RoootNavigator(){

    const { user, setUser } = useApp();
    const [isLoading, setIsLoading] = React.useState(false);
    console.log(user);

    useEffect(() => {
    }, [user]);

    if (isLoading) {
        return (
            <LoadingScreen />
        );
    }

    return(
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack /> }
            <StatusBar style='light' backgroundColor='#FF6600' translucent={true} />
        </NavigationContainer>
    )
}