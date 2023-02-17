import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { colors, parameters } from '../global/styles'
import { ChevronDownIcon, ChevronLeftIcon, MapPinIcon, PlusIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { DestinationContext, OriginContext } from '../contexts/context'

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const BookScreen = () => {
    const navigation = useNavigation();
    const {origin,dispatchOrigin} = useContext(OriginContext)
    const [userOrigin,setUserOrigin] = useState({latitude:origin.latitude,
                                                  longitude:origin.longitude})
    const {destination,dispatchDestination} = useContext(DestinationContext)
    const [userDestination,setUserDestination] = useState({latitude:destination.latitude,
                                                longitude:destination.longitude}) 

    useEffect(() => {
      setUserOrigin({
        latitude: origin.latitude,
        longitude: origin.longitude,
        name: origin.name
      });
      setUserDestination({
        latitude: destination.latitude,
        longitude: destination.longitude,
        name: destination.name
      })
    }, [origin, destination])


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
            <TouchableOpacity>
                <View style ={styles.view3}>
                    <Image 
                        className="w-7 h-7 rounded-full"
                        source = {require('../../assets/images/blankProfilePic.jpg')}
                        />
                        <Text style ={{marginLeft:5}}>For Someone</Text>
                        <ChevronDownIcon 
                            color ={colors.grey1}
                            size ={20}
                        />
                </View>
            </TouchableOpacity>
        </View>

        <View style = {styles.view2}>
                <View style ={styles.view4}>
                    <View>
                        <Image 
                            style = {styles.image1}
                            source ={require("../../assets/images/transit.png")}
                        />
                    </View>
                    <View>
                        <View>
                          <Text className="mb-1">Pickup Location</Text>
                          <TouchableOpacity onPress ={()=>navigation.navigate("PickupScreen")} className="flex-row items-center border border-black px-2 rounded-sm">
                              <MapPinIcon size={16} fill="blue" />
                              <View style = {styles.view6}>
                                  <Text style ={styles.text1}>{origin?.name}</Text>
                              </View>
                          </TouchableOpacity>
                        </View>

                        <View className="mt-5">
                          <Text className="mb-1">Destination Location</Text>
                          <TouchableOpacity onPress ={()=>navigation.navigate("DestinationScreen", {type: 'ride'})} className="flex-row items-center border border-black px-2 rounded-sm">
                              <MapPinIcon size={16} fill="red" />
                              <View style = {styles.view6}>
                                  <Text style ={styles.text1}>{destination?.name}</Text>
                              </View>
                          </TouchableOpacity>
                        </View>
                    </View>
                   
                </View>
        </View>
    </View>
  )
}

export default BookScreen

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
        backgroundColor:colors.white,
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
        zIndex: 5,
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
        fontSize:13,
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