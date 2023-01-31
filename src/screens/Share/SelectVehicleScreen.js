import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { DestinationContext, OriginContext, PaymentContext } from '../../contexts/context';
import { useNavigation } from '@react-navigation/native';
import MapComponent from '../../components/MapComponent';
import { ChevronLeftIcon, StarIcon, UserIcon } from 'react-native-heroicons/outline';
import { carTypeData } from '../../global/data';
import { GOOGLE_MAP_API_KEY } from '@env';
import { colors, parameters } from '../../global/styles';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const SelectVehicleScreen = () => {

  const [isSelected, setIsSelected] = useState('Car');

  const navigation = useNavigation();
    const {
        origin,
        dispatchOrigin
    } = useContext(OriginContext)
    const [userOrigin, setUserOrigin] = useState({
        latitude: origin.latitude,
        longitude: origin.longitude,
        name: origin.name,
    })
    const {
        destination,
        dispatchDestination
    } = useContext(DestinationContext)
    const [userDestination, setUserDestination] = useState({
        latitude: destination.latitude,
        longitude: destination.longitude,
        name: destination.name
    });
    const {
        payment,
        dispatchPayment
    } = useContext(PaymentContext);
    const [paymentOrigin, setPaymentOrigin] = useState({
        type: payment.type,
        state: payment.state
    });

    const getTimeTravel = () => {
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
                  units=imperial&origin=${origin.description}&destination=$
                  {destination.description}&key=${GOOGLE_MAP_API_KEY}`)
        .then((res) => res.json)
        .then((data) => {
          // console.log(data.rows[0].elements[0]);
          console.log(data)
        }
      );
    }

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
      });

      setPaymentOrigin({
        type: payment.type,
        state: payment.state,
      });

      getTimeTravel();
    }, [origin, destination, payment])

    const handleSubmit = () => {
      navigation.navigate('ConnectionScreen', {
        origin: userOrigin,
        destination: userDestination,
        car: isSelected
      });
    }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.view1}>
          <View>
            <ChevronLeftIcon size={20} fill="white" />
          </View>
      </TouchableOpacity>

      <View>
         <MapComponent userOrigin={userOrigin} userDestination= {userDestination}/>
      </View>

      <ScrollView style={styles.small}>
         <View>
          <FlatList 
              data={carTypeData} 
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => setIsSelected(item.name)} className={`flex-row items-center space-x-8 shadow-sm bg-white py-4 px-1 my-2 ${isSelected === item.name ? 'border border-[#FF6600]' : ''} rounded-xl`}>
                    <View className="w-full">
                        <View className="flex-row items-center justify-between px-1">
                          <View className="flex-row space-x-2 items-center">
                              <Image source={item.image} />
                              <View>
                                  <Text>{item.name}</Text>
                                  <View className="flex-row">
                                  <Text className="text-[12px]">1mins</Text>
                                  <UserIcon size={15} fill="black" />
                                  <Text className="text-[12px]">{item.seat} seats</Text>
                                  </View>
                              </View>
                          </View>
                          
                          <View>
                              <Text className="font-bold text-[15px] text-blue-700">$2000</Text>
                          </View>
                        </View>
                        
                        <View className="flex-row items-center justify-between px-1 mt-4">
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
                                </View>
                            </View>
                            <View className="flex-col justify-center items-center">
                                <Image source={require('../../../assets/images/profile.png')} resizeMode="contain" style={{ 
                                    width: 100
                                }} />
                                <View className="flex-row items-center space-x-1 mt-2">
                                    <StarIcon size={13} fill="yellow" />
                                    <StarIcon size={13} fill="yellow" />
                                    <StarIcon size={13} fill="yellow" />
                                    <StarIcon size={13} fill="yellow" />
                                    <StarIcon size={13} fill="yellow" />
                                </View>
                                <Text className="mt-1">70 Driven</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
              )}
            />
         </View>
      </ScrollView>

      <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.button1} onPress={handleSubmit}>
                <Text className="text-white font-semibold text-lg">Select Trip</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}

export default SelectVehicleScreen

const styles = StyleSheet.create( {
  container1: {
    flex:1,
    paddingTop: parameters.statusBarHeight,

  },
  arrow: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  btnContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 10,
    right: 0,
    zIndex: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  small: {
    zIndex: 10, 
    position:"absolute", 
    bottom:0,
    backgroundColor: "#FFFFFF",
    width: '100%',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 15,
    height: '70%'
  },

  container: {
    flex: 1,
    paddingTop: parameters.statusBarHeight
  },

  contentContainer: {
    flex: 1,
    alignItems: 'center',

  },

  view1: {
    position:"absolute",
    top:45,
    left:15,
    backgroundColor: colors.grey,
    height:30,
    width:30,
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

  view11: {
    backgroundColor:colors.grey,
    height:30,
    width:30,
    borderRadius:15,
    alignItems:"center",
    justifyContent:"center",
    marginRight:15,
    marginTop:15,
  },

  contentContainer: {
    backgroundColor: 'white',
  },

  view12: {
    alignItems:"center",
    paddingVertical:10,
    borderBottomWidth:1,
    borderBottomColor:colors.grey4
  }

  ,

  text2: {
    fontSize:18,
    color:colors.grey1
  }

  ,
  text3: {
    fontSize:16,
    color:colors.black,
    fontWeight:"bold",
    marginRight:5,

  }

  ,

  text4: {
    color:colors.grey2,
    marginTop:4
  }

  ,

  view13: {
    flexDirection:"row",
    alignItems:"flex-start",
    justifyContent:"space-between",
    paddingHorizontal:15,
    paddingVertical:5
  }

  ,

  button1: {
    height:40,
    width: 220,
    backgroundColor: '#FF6600',
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center",
  }

  ,

  button2: {
    height:50,
    width:100,
    backgroundColor:colors.white,
    alignItems:"center",
    justifyContent:"center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderRadius:20,
    borderColor: '#FF6600'
  },

  button1Text: {

    fontSize:17,
    marginTop:-2,
    color:colors.black
  }

  ,

  button2Text: {
    color:colors.white,
    fontSize:23,
    marginTop:-2,


  }

  ,


  view14: {


    alignItems:"center",
    flex:5,
    flexDirection:"row"
  }

  ,
  view15: {
    backgroundColor:colors.grey6,
    height:40,
    width:40,
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center",
    marginRight:20
  }

  ,

  view16: {
    flexDirection:"row",
    alignItems:"baseline"
  }

  ,

  text5: {
    fontSize:12,
    color:colors.black,
    marginLeft:3,
    fontWeight:"bold",
    paddingBottom:1
  },

  view19: {
    flex:1.7,
    alignItems:"flex-end",

  }

  ,

  icon: {
    paddingBottom:2
  }

  ,

  image2: {
    height:60, width:60
  }

  ,

  view20: {
    marginRight:10
  }

  ,

  text6: {
    fontSize:15,
    color:colors.black,
    fontWeight:"bold",
  }

  ,

  view21: {
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginHorizontal:30,
    marginTop:15
  }

  ,

  view22: {
    alignItems:"center",
    marginBottom:-20
  }

  ,

  sectionHeaderContainer: {
    backgroundColor: "white",
    marginTop:30,
    paddingLeft:15
  }

  ,

  text7 : {
    fontSize:28,
    color:colors.black,
    marginRight:5,

  }

  ,

  text8: {
    fontSize:15,
    color:colors.grey2,
    textDecorationLine:"line-through"


  },

  view23: {
    flexDirection:"row",
    backgroundColor:colors.cardbackground,
    // elevation:10,
    justifyContent:"space-between",
    alignItems:"flex-end",
    paddingHorizontal:20,
    height:80,

  }

  ,

  button2Image: {
    height:55,
    width:55,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:colors.grey6,
    marginBottom:10,

  }

  ,
  text9: {
    fontSize:15,
    color:colors.grey1
  },

  modalView: {
    marginHorizontal: 20,
    marginVertical:60,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical:20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    }

    ,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex:16
  },
}

)