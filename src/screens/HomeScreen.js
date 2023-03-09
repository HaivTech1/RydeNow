import React, { useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, Dimensions, StyleSheet} from 'react-native'
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { 
  ChevronDownIcon,
  Bars3BottomLeftIcon,
  MapPinIcon,
} from 'react-native-heroicons/solid';
const SCREEN_WIDTH = Dimensions.get('window').width;
import { colors, parameters } from '../global/styles';
import { mapStyle } from '../global/mapStyle'
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { filterData, carsAround } from '../global/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useApp from '../contexts/context';

export default function HomeScreen() {

  const [latlong, setLatLong] = useState({})
  const [address, setAddress] = useState({
    city: '',
    country: '',
  });

  const {user} = useApp();

  const checkPermission = async () => {
    const hasPermission = await Location.requestForegroundPermissionsAsync();

    if (hasPermission === 'granted') {
      const permission = await askPermission();
      return permission;
    }

    return true;
  }

  const askPermission = async () => {
    const permission = await Location.requestForegroundPermissionsAsync();
    return permission.status === 'granted'
  }

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;

      const { 
        coords: { latitude, longitude } 
      } = await Location.getCurrentPositionAsync();
      setLatLong({latitude: latitude, longitude: longitude});

      let add = await Location.reverseGeocodeAsync({
        latitude : latitude,
        longitude : longitude
      });

      let city;
      let country;

      add.find( p => {
        city = p.city,
        country = p.country
        setAddress({
          city: city,
          country: country
        })
      });

    } catch (error) {
      console.log(error);
    }
  }

  const _map = useRef(1);

  const navigation = useNavigation();

  const getVehicleImage = (type) => {
    if (type === 'Suv') {
      return require('../../assets/images/cars/suv.png')
    }

    if (type === 'Car') {
      return require('../../assets/images/cars/carMarker.png')
    }

    if (type === 'Van') {
      return require('../../assets/images/cars/van.png')
    }
  }

  useEffect(() => {
    checkPermission();
    navigation.setOptions({
      headerShown: false,
    });
    console.log(latlong);
  }, [])

  useEffect(() => {
    getLocation();
  }, [])

  const clearOnboarding = async () => {
      try {
        await AsyncStorage.removeItem('@viewedOnboarding');
        return navigation.navigate('OnboardingScreen');
      } catch (error) {
        console.log('Error @clearOnboarding: ', error );
      }
  };
  
  return (
    <SafeAreaView>
      <View className="p-1 h-[20%] bg-white mt-4">
        <View className="flex-row justify-between items-center mt-5">
            <View className="flex-row items-center space-x-3 p-3">

              <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} className="rounded-full t.shadowXl py-2 px-4">
                <Bars3BottomLeftIcon size={22} color="#000" fill="black" />
              </TouchableOpacity>
              
              <View className="flex">
                  <Text className="font-medium">Hi {user?.name}</Text>
                  <Text className="font-medium">How are you feeling today?</Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')} className="mr-2">
              <Image source={require('../../assets/images/profile.png')} className="rounded-full w-[45px] h-[45px] bg-gray-300 p-4" />
            </TouchableOpacity>
        </View>

        <View className="flex-row space-x-1 ml-7">
            <MapPinIcon size={20} fill="black" />
            <Text className="font-medium">{address.city}, {address.country}</Text>
            <ChevronDownIcon size={18} fill="black" />
        </View>
      </View>

      <View className="h-[60%]">
          <MapView
            ref={_map}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            customMapStyle={mapStyle}
            showsUserLocation={true}
            followsUserLocation={true}
            initialRegion={{ ...carsAround[0], latitudeDelta: 0.008, longitudeDelta: 0.008}}
          >
              {carsAround.map((item) => 
                <Marker 
                  coordinate={{ latitude: item.latitude, longitude: item.longitude}}
                  key={item.id}
                >
                <Image 
                  source={getVehicleImage(item.type)} 
                  style={{ 
                    width: 28,
                    height: 14,
                    resizeMode: "contain",
                    // transform: [{
                    //   rotate: `${item.heading}deg`,
                    // }]
                   }}
                  resizeMode="cover"
                />
               </Marker>
              )}
          </MapView>
      </View>
      
      <View className="flex-row justify-center items-center h-[20%] bg-white">
          <View className="flex-row space-x-7">
            <TouchableOpacity onPress={() => navigation.navigate('MapScreen')} className="flex-col justify-center items-center space-y-1 border-2 border-[#FF6600] rounded-3xl px-6 py-4">
                <Image source={require('../../assets/images/carIcon.png')} className="w-[29.33px] h-[16px]" />
                <Text className="font-medium">Ride Now</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ShareScreen', {state: 0})} className="flex-col justify-center items-center space-y-1 border-2 border-[#FF6600] rounded-3xl px-6 py-4">
                <Image source={require('../../assets/images/carIcon.png')} />
                <Text className="font-medium">Share Ride</Text>
            </TouchableOpacity>
          </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  map:{
    height: '100%',
      width: SCREEN_WIDTH
  },
  // carsAround: {
  //   width: 28,
  //   height: 14,
  //   resizeMode: "contain",
  //   transform: [{
  //     rotate: `${item.heading}deg`,
  //   }]
  // },
})