import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ChevronDownIcon, ChevronLeftIcon, StarIcon, UserIcon } from 'react-native-heroicons/outline'
import { colors, parameters } from '../../global/styles';
import MapComponent from '../../components/MapComponent';
import { DestinationContext, OriginContext } from '../../contexts/context';
import ModalCancelTrip from '../../components/ModalConfirm';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const ConfirmTrip = ({ navigation }) => {

    const [visible, setVisible] = useState(false);

    const {origin, dispatchOrigin} = useContext(OriginContext);
    const [userOrigin, setUserOrigin] = useState({
      latitude: origin.latitude,
      logitude: origin.longitude
    })

    const {destination,dispatchDestination} = useContext(DestinationContext)
    const [userDestination,setUserDestination] = useState({latitude:destination.latitude,
                                                longitude:destination.longitude}) 

    useEffect(()=>{
      setUserOrigin({latitude:origin.latitude,
          longitude:origin.longitude});
      setUserDestination({latitude:destination.latitude,
          longitude:destination.longitude})    
  },[origin,destination])

  return (
    <View style={styles.container}>
        <ModalCancelTrip visible={visible} setVisible={setVisible} />

        <View className="px-4 py-3 bg-white">
            <View className="flex-row items-center space-x-3">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View>
                        <ChevronLeftIcon size={20} fill="black" />
                    </View>
                </TouchableOpacity>
                <Text className="font-normal text-lg">Trip Details</Text>
            </View>
            <Text className="mt-3 mx-2">Sat Dec 17 2022</Text>
        </View>
        
        <View className="h-[209px]">
            <MapComponent userOrigin={userOrigin} userDestination= {userDestination}/>
        </View>
        <ScrollView>
            <View className="mx-5">
                <View className="flex-row items-center space-x-2">
                    <Image source={require('../../../assets/images/locationGroup.png')} />
                    <View className="flex-1">
                        <Text className="text-md font-medium my-1 py-1">{origin.name}</Text>
                        <Text className="text-md font-medium my-1 py-1">{destination.name}</Text>
                    </View>
                </View>
                <View>
                    <View className="flex-row space-x-2 items-center">
                        <Image source={require('../../../assets/images/cars/car.png')} />
                        <View>
                            <Text className="text-lg font-bold">Car</Text>
                            <View className="flex-row space-x-10 items-center">
                                <View className="flex-row items-center">
                                    <Text className="text-[12px]">3 hrs</Text>
                                    <UserIcon size={13} fill="black" />
                                    <Text className="text-[12px]">4 Seats</Text>
                                </View>
                                <View className="flex-row items-center">
                                    <UserIcon size={10} fill="black" />
                                    <Text className="text-[12px]">2 seats available</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className="flex-row">
                        <View>
                            <Text className="text-lg font-thin">Matthew Peter</Text>
                            <View className="flex-row space-x-3 items-center">
                                <Text>Mazda 323F, Silver</Text>
                                <Text className="font-normal bg-gray-200 p-1">122345GG</Text>
                            </View>
                            <View className="mt-4">
                                <Text className="font-extralight">Departure Date: 17 Dec 2022</Text>
                                <Text className="font-extralight">Departure Time: 11:00am</Text>
                                <Text className="font-extralight">Departure point: St peters, Ontario</Text>
                                <Text className="font-extralight">Estimated ride time: 3hrs</Text>
                            </View>
                        </View>
                        <View className="flex-col p-10 justify-center items-center">
                            <Image source={require('../../../assets/images/profile.png')} resizeMode="contain" style={{ 
                                width: 100
                             }} />
                             <View className="flex-row items-center space-x-1 mt-2">
                                <StarIcon size={15} fill="yellow" />
                                <StarIcon size={15} fill="yellow" />
                                <StarIcon size={15} fill="yellow" />
                                <StarIcon size={15} fill="yellow" />
                                <StarIcon size={15} fill="yellow" />
                             </View>
                             <Text className="mt-1">70 Driven</Text>
                        </View>
                    </View>
                </View>
                <View className="mt-2 flex-row justify-around items-center">
                    <View className="flex-row space-x-2 items-center">
                        <Image source={require('../../../assets/images/cars/mastercard.png')} style={{width: 52, height: 40}} />
                        <Text>****6536</Text>
                        <ChevronDownIcon size={18} fill="black" />
                    </View>
                    <View>
                      <Text className="font-bold text-[15px] text-blue-700">$300</Text>
                    </View>
                </View>
                <View className="m-4">
                    <Text className="font-light">Note:</Text>
                    <Text className="mt-2 font-extralight">
                        You will be asked to confirm your trip 24 hours ahead of ‘trip time’
                        Drivers can cancel ride
                    </Text>
                </View>

                <TouchableOpacity onPress={() => setVisible(true)} className="bg-[#FF6600] py-4 mb-3 rounded-xl flex-row space-x-2 items-center justify-center mt-2 mx-8">
                    <Text className="text-center text-xl font-medium text-[#FFF]">Cancel Trip</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </View>
  )
}

export default ConfirmTrip

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: parameters.statusBarHeight,
        backgroundColor: 'white',
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
});