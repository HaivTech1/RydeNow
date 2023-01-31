import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList, Image } from 'react-native'
import React from 'react'
import { ChevronLeftIcon, PlusIcon } from 'react-native-heroicons/solid'
import { colors, parameters } from '../../global/styles';
import { trips } from '../../global/data';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const TripsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View className="flex-row justify-between items-center px-4 py-3 bg-white mb-4">
            <View className="flex-row items-center space-x-3">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View>
                        <ChevronLeftIcon size={20} fill="black" />
                    </View>
                </TouchableOpacity>
                <Text className="font-bold text-lg">Your Trips</Text>
            </View>
        </View>

        <View className="p-3 bg-white">
            <Text className="text-[17px] mt-1 mb-3">Active Trip</Text>
            
            <View>
                <View className="flex-row justify-between items-center">
                    <Text>17 Dec 2022</Text>
                    <Text>8:30pm</Text>
                </View>
                <View className="">
                    <View className="">
                        <View className="flex-row items-center space-x-2">
                            <Image source={require('../../../assets/images/locationGroup.png')} />
                            <View className="flex-1">
                                <Text className="text-md font-medium my-1 py-1">Harmony hostel Kwara state</Text>
                                <Text className="text-md font-medium my-1 py-1">Harmony hostel Kwara state</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <TouchableOpacity className="px-2" onPress={() => navigation.navigate('SelectVehicleScreen')}>
                    <Text className="text-[#FF6600] font-normal text-lg">See Details</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View className="px-5 mt-2 bg-white">
            <Text className="text-[17px] mt-1 mb-3">Recent Trips</Text>

            <FlatList
                data={trips} 
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                  <View className="my-1">
                        <View className="flex-row justify-between items-center">
                            <Text>{item.date}</Text>
                            <Text>{item.time}</Text>
                        </View>
                        <View className="">
                            <View className="border-gray-300 border-b">
                                <View className="flex-row items-center space-x-2 py-1">
                                    <Image source={require('../../../assets/images/locationGroup.png')} />
                                    <View className="flex-1">
                                        <Text className="text-md font-medium my-1 py-1">{item.origin}</Text>
                                        <Text className="text-md font-medium my-1 py-1">{item.destination}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                  </View>
                )}
            />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('NewTripScreen')} style={styles.add}>
            <PlusIcon size={40} fill="white" style={styles.icon} />
        </TouchableOpacity>
    </View>
  )
}

export default TripsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: parameters.statusBarHeight
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
    button1: {
        height:40,
        width: 220,
        backgroundColor: colors.primary,
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center",
    },
    add: {
        position: "absolute",
        bottom: 60,
        right: 30,
        backgroundColor: colors.primary,
        padding: 5,
        zIndex: 10,
        borderRadius: 10,
    },
    icon: {
        width: 10
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