import { View, Text, Dimensions, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon, ChevronLeftIcon, MapPinIcon } from 'react-native-heroicons/solid';
import { colors, parameters } from '../../global/styles';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Datepicker from '../../components/Datepicker';
import { SelectList  } from 'react-native-dropdown-select-list'
import { DestinationContext, OriginContext } from '../../contexts/context';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const NewTripScreen = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selected, setSelected] = useState([]);
  
    const data = [
      {key:'1', value:'1 Seat'},
      {key:'2', value:'2 Seats'},
      {key:'3', value:'3 Seats'},
      {key:'4', value:'4 Seats'},
      {key:'5', value:'5 Seats'},
      {key:'6', value:'6 Seats'},
      {key:'7', value:'7 Seats'},
    ]

    const textInput1 = useRef(1);
    const textInput2 = useRef(2);

    const [newTrip, setNewTrip] = useState({
        from: 'Enter Origin',
        description: '',
    });

    const handleAddCard = () => {

    }

    const {origin,dispatchOrigin} = useContext(OriginContext)
    const [userOrigin,setUserOrigin] = useState({latitude:origin.latitude,
                                                  longitude:origin.longitude})
    const {destination, dispatchDestination} = useContext(DestinationContext)
    const [userDestination, setUserDestination] = useState({latitude:destination.latitude,
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
     <ScrollView style={styles.container}>
        <View className="flex-row justify-between items-center px-4 py-3">
            <View className="flex-row items-center space-x-3">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View>
                        <ChevronLeftIcon size={20} fill="black" />
                    </View>
                </TouchableOpacity>
                <Text className="font-bold text-lg">Request a trip</Text>
            </View>
        </View>

        <KeyboardAvoidingView className="px-5 mt-5 flex-col">
           <View className="h-[85%]">
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
                          <TouchableOpacity onPress ={()=>navigation.navigate("DestinationScreen", {type:'shareRide'})} className="flex-row items-center border border-black px-2 rounded-sm">
                              <MapPinIcon size={16} fill="red" />
                              <View style = {styles.view6}>
                                  <Text style ={styles.text1}>{destination?.name}</Text>
                              </View>
                          </TouchableOpacity>
                        </View>

                <View className="mt-5">
                    <Text className="font-medium text-gray-500 mb-1">Departure Date</Text>
                    {/* <TextInput
                        focusable={true}
                        autoComplete="birthdate-full"
                        keyboardType="text"
                        maxLength={40}
                        onChangeText={text => onChangeText(text)}
                        dataDetectorTypes="calendarEvent"
                        style={{
                            backgroundColor: 'transparent',
                            borderColor: 'black',
                            borderWidth: 1,
                            borderRadius: 5,
                            width: SCREEN_WIDTH - 40,
                            padding: 12
                        }}
                    /> */}
                   <Datepicker 
                        textStyle={{ 
                            paddingHorizontal: 10,
                            paddingVertical: 15,
                            borderColor: 'black',
                            borderWidth: 1,
                            borderRadius: 5
                        }} 
                        defaultDate="2023-01-01"
                    />
                </View>

                 <View className="mt-5">
                    <Text className="font-medium text-gray-500 mb-1">No. of seats required</Text>
                    <SelectList 
                        onSelect={() => console.log('selected')}
                        setSelected={setSelected} 
                        data={data}  
                        arrowicon={<ChevronDownIcon size={12} color={'black'} />} 
                        search={false} 
                        boxStyles={{
                            borderRadius: 0,
                            paddingVertical: 15,
                            borderRadius: 5,
                            borderColor: 'black',
                        }}
                        defaultOption={{ key:'1', value:'1 Seat' }}
                    />
                </View>

                <View className="mt-5">
                    <Text className="font-medium text-gray-500 mb-1">Description</Text>
                    <View
                        style={{
                            borderColor: '#000000',
                            borderWidth: 1,
                            paddingHorizontal: 7,
                            borderRadius: 5
                        }}
                    >
                        <TextInput
                            editable
                            multiline
                            numberOfLines={7}
                            maxLength={40}
                            onChangeText={text => onChangeText(text)}
                            value={newTrip.description}
                            style={{
                                borderRadius: 0,
                            }}
                        />
                    </View>
                </View>

                <View className="flex-row justify-center mt-5 mb-8">
                    <TouchableOpacity style={styles.button1} onPress={handleAddCard}>
                        <View className="flex-row space-x-4 items-center">
                            {isLoading && 
                                <ActivityIndicator size="small" color="#fff" />
                            }
                            <Text className="text-white font-medium text-lg">Send Request</Text>
                        </View>
                    </TouchableOpacity>
                </View>
           </View>
        </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default NewTripScreen

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
        bottom: 40,
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