import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import BookScreen from '../screens/BookScreen';
import PickupScreen from '../screens/PickupScreen';
import DestinationScreen from '../screens/DestinationScreen';
import ConfirmPickScreen from '../screens/ConfirmPickScreen';
import BookPayment from '../screens/BookPayment';
import AddCardScreen from '../screens/AddCardScreen';
import SelectRideScreen from '../screens/SelectRideScreen';
import ConnectionScreen from '../screens/ConnectionScreen';
import ArrivalScreen from '../screens/ArrivalScreen';
import Onboarding from '../screens/Onboarding';
import LoadingScreen from '../screens/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShareScreen from '../screens/Share/ShareScreen';
import TripsScreen from '../screens/Share/TripsScreen';
import NewTripScreen from '../screens/Share/NewTripScreen';
import ConfirmTrip from '../screens/Share/ConfirmTrip';
import SelectVehicleScreen from '../screens/Share/SelectVehicleScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RideDetailScreen from '../screens/RideDetailScreen'
import ScheduleDetailScreen from '../screens/ScheduleDetailScreen';
import ProfileEditScreen from '../screens/ProfileEditScreen';


const Home = createStackNavigator();


export function HomeStack() {

    const [loading, setLoading] = React.useState(false);
    const [viewedOnboarding, setViewedOnboarding] = React.useState(false);

  const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem('@viewedOnboarding');

        if (value !== null){
          setViewedOnboarding(true);
        }
      } catch (error) {
        console.log('Error @checkOnboarding', error);
      }finally{
        setLoading(false);
      }
  }

  React.useEffect(() => {
    checkOnboarding()
  }, [])

    return (
        <Home.Navigator>
            {loading ? (
                <Home.Screen 
                    name="LoadingScreen" 
                    component={LoadingScreen}
                    options={{ 
                        headerShown:false,
                    }} 
                />
            ) : viewedOnboarding ? (
                <Home.Screen 
                    name="OnboardingScreen" 
                    component={Onboarding}
                    options={{ 
                        headerShown:false,
                    }} 
                />
            ) : (
                <Home.Screen name="HomeScreen" component={HomeScreen} />
            )}
            
            <Home.Screen 
                name="MapScreen" 
                component={MapScreen}
                 options={{ 
                    headerShown:false,
                }} 
            />
            <Home.Screen 
                name="ShareScreen" 
                component={ShareScreen}
                 options={{ 
                    headerShown:false,
                }} 
            />
            <Home.Screen 
                name="TripsScreen" 
                component={TripsScreen}
                 options={{ 
                    headerShown:false,
                }} 
            />
            <Home.Screen 
                name="NewTripScreen" 
                component={NewTripScreen}
                 options={{ 
                    headerShown:false,
                }} 
            />
            <Home.Screen 
                name="ConfirmTrip" 
                component={ConfirmTrip}
                 options={{ 
                    headerShown:false,
                }} 
            />
            <Home.Screen 
                name="SelectVehicleScreen" 
                component={SelectVehicleScreen}
                 options={{ 
                    headerShown:false,
                }} 
            />
            <Home.Screen 
                name="BookScreen" 
                component={BookScreen}
                 options={{ 
                    headerShown:false,
                }} 
            />
            <Home.Screen 
                name="PickupScreen" 
                component={PickupScreen}
                 options={{ 
                    headerShown:false,
                }} 
            />
            <Home.Screen 
                name="DestinationScreen" 
                component={DestinationScreen}
                 options={{ 
                    headerShown:false,
                }} 
            />
            <Home.Screen 
                name="ConfirmPickScreen" 
                component={ConfirmPickScreen}
                 options={{ 
                    headerShown:false,
                }} 
            />
            <Home.Screen 
                name="BookPayment" 
                component={BookPayment}
                 options={{ 
                    headerShown:false,
                }} 
            />
            <Home.Screen 
                name="AddCardScreen" 
                component={AddCardScreen}
                 options={{ 
                    headerShown:false,
                }} 
            />
            <Home.Screen 
                name="SelectRideScreen" 
                component={SelectRideScreen}
                 options={{ 
                    headerShown:false,
                }} 
            />
            <Home.Screen 
                name="ConnectionScreen" 
                component={ConnectionScreen}
                 options={{ 
                    headerShown:false,
                }} 
            />
            <Home.Screen 
                name="ArrivalScreen" 
                component={ArrivalScreen}
                 options={{ 
                    headerShown:false,
                }} 
            />
            <Home.Screen 
                name="ProfileScreen" 
                component={ProfileScreen}
                 options={{ 
                    headerShown:false,
                }} 
            />
            <Home.Screen 
                name="RideDetailScreen" 
                component={RideDetailScreen}
                 options={{ 
                    headerShown:false,
                }} 
            />
            <Home.Screen 
                name="ScheduleDetailScreen" 
                component={ScheduleDetailScreen}
                 options={{ 
                    headerShown:false,
                }} 
            />
            <Home.Screen 
                name="ProfileEditScreen" 
                component={ProfileEditScreen}
                 options={{ 
                    headerShown:false,
                }} 
            />
        </Home.Navigator>
    );
}