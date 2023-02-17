import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { colors, parameters } from '../global/styles';
import { DestinationContext } from '../contexts/context';
import { ChevronLeftIcon, MapPinIcon } from 'react-native-heroicons/solid';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env'

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const DestinationScreen = ({route}) => {

  const { type } = route.params;

  const navigation = useNavigation();
  
  const {destination, dispatchDestination} = useContext(DestinationContext);
  const textInput2 = useRef(5);

  return (
    <View style={styles.container}>
        <View className="flex-row justify-between items-center px-4 py-3">
            <View className="flex-row items-center space-x-3">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View>
                        <ChevronLeftIcon size={20} fill="black" />
                    </View>
                </TouchableOpacity>
                <Text className="font-normal text-lg">Book a ride</Text>
            </View>
        </View>

        <View className="">
            <View>
              <Text className="mx-5 mb-1">Destination Location</Text>
                <GooglePlacesAutocomplete 
                    ref={textInput2}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    listViewDisplayed="auto"
                    debounce={400}
                    fetchDetails={true}
                    returnKeyType={"Search"}
                    minLength={2}
                    enablePoweredByContainer={false}
                    autoFocus={true}
                    query={{
                      key: GOOGLE_MAPS_APIKEY,
                      language: 'en',
                    }}
                    styles={{ 
                      container: {
                        flex: 0,
                      },
                      textInput: {
                        fontSize: 12,
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                        backgroundColor: 'white',
                        flexDirection: 'row',
                      },
                      textInputContainer: {
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderRightWidth: 1,
                        borderLeftWidth: 1,
                        borderRadius: 5,
                        marginHorizontal: 10,
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingHorizontal: 18,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }
                    }}
                    onPress= {(data, details = null) => {
                      console.log(details.geometry);
                      dispatchDestination({ type: 'ADD_DESTINATION', payload: {
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        address: details.formatted_address,
                        name: details.name
                      }
                       
                      });
                      console.log(destination)

                      if (type === 'shareRide') {
                        navigation.goBack();
                      }else{
                        navigation.navigate('ConfirmPickScreen', {state: 0});
                      }
                    }}
                    renderLeftButton={()  => <MapPinIcon size={18} fill="red"/>}
                />
            </View>
        </View>
    </View>
  )
}

export default DestinationScreen

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: parameters.statusBarHeight,
      backgroundColor: colors.white
  },
  view1: {
      position:"absolute",
      top:25,
      left:12,
      backgroundColor: colors.white,
      height:40,
      width:40,
      borderRadius:20,
      justifyContent:"center",
      alignItems:"center",
      marginTop:2,
      zIndex: 8
  },
  view2: {
      height: SCREEN_HEIGHT*0.21,
      alignItems: 'center',
      backgroundColor: colors.white
    },

    view3: {
      flexDirection:"row",
      alignItems:"center",
      marginTop:2,
      marginBottom:10,
      backgroundColor: colors.white,
      //height:30,
      zIndex:10,


    },

    view4:{
      flexDirection:"row",
      alignItems:"center",
    },

    view5:{
      width:SCREEN_WIDTH*0.70,
      height:40,
      justifyContent:"center",
      marginTop:10,
      borderWidth: 1,
      borderRadius: 5,
      
  },
  view6:{
    width:SCREEN_WIDTH*0.70,
    height:40,
    justifyContent:"center",
    marginTop:1,
    paddingLeft:0,
  },

    text1: {
      marginLeft:10,
      fontSize:16,
      color:colors.grey1
    },

    image1: {
      height:70,
      width:30,
      marginRight:10,
      marginTop:10
    },

    view7: {
      flexDirection:"row",
      alignItems:"center"
    },

    view8: {
      marginLeft:10
    },

    view10: {
      alignItems:"center",
      flex:5,
      flexDirection:"row",
      paddingVertical:10,
      borderBottomColor:colors.grey5,
      borderBottomWidth:1,
      paddingHorizontal:15
  },
  text10:{color:colors.grey2,
      paddingLeft:10
  }
});