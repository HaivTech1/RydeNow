import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { colors } from '../global/styles';
import { DestinationContext, OriginContext, PaymentContext } from '../contexts/context';
import { ChatBubbleLeftIcon, ChevronDownIcon, ChevronLeftIcon, ShieldCheckIcon } from 'react-native-heroicons/outline';
import MapComponent from '../components/MapComponent';
import BottomSheet from '@gorhom/bottom-sheet';
import ModalCancelTrip from '../components/ModalConfirm';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const ArrivalScreen = ({ navigation, route }) => {

  const [visible, setVisible] = useState(false);

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

   const bottomsheet1 =useRef(1);  
   
   const snapPoints1 = useMemo(()=>['40%', '70%'],[])
   const handleSheetChange1  = useCallback((index)=>{
        console.log('handleSheetChanges', index);
   },[]);

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
    }, [origin, destination, payment])
  return (
    <View style={styles.container}>
        <ModalCancelTrip visible={visible} setVisible={setVisible} />

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.view1}>
            <View>
                <ChevronLeftIcon size={20} fill="white" />
            </View>
        </TouchableOpacity>

        <View>
            <MapComponent userOrigin={userOrigin} userDestination= {userDestination}/>
        </View>

        <BottomSheet
            ref={bottomsheet1}
            index={route.params.state}
            snapPoints = {snapPoints1}
            onChange={handleSheetChange1}
        >
            <View style={styles.container}>
                
                <View className="px-3">
                  <Text className="text-xl font-bold">Arriving in 1 mins</Text>
                  <View className="flex-row space-x-4 items-center mt-1">
                    <Text className="text-lg">Mazda 323F, Silver</Text>
                    <Text className="text-lg bg-gray-200 p-1">122345GG</Text>
                  </View>
                </View>
                
                <View className="flex-row items-center space-x-12 py-4 mx-auto">
                    <View className="flex-col justify-center items-center">
                        <View>
                            <Image source={require('../../assets/images/profile.png')} className="rounded-full w-[55px] h-[55px]" />
                        </View>
                        <Text className="text-lg font-thin mt-1">Matthew</Text>
                    </View>
                    <View className="flex-col justify-center items-center">
                        <View className="bg-[#FF6600]/20 rounded-full p-3 text-center">
                          <ChatBubbleLeftIcon size={32} fill="#FF6600" />
                        </View>
                        <Text className="text-lg font-thin mt-1">Chat</Text>
                    </View>

                    <View className="flex-col justify-center items-center">
                        <View className="bg-[#000066]/20 rounded-full p-3 text-center">
                          <ShieldCheckIcon size={32} fill="#000066" />
                        </View>
                        <Text className="text-lg font-thin mt-1">Safety</Text>
                    </View>
                </View>

                <View className="border-t border-gray-300 border-b mx-5">
                    <View className="flex-row items-center space-x-2">
                        <Image source={require('../../assets/images/locationGroup.png')} />
                        <View className="flex-1">
                            <Text className="text-md font-medium my-1 py-1">{origin.name}</Text>
                            <Text className="text-md font-medium my-1 py-1">{destination.name}</Text>
                        </View>
                    </View>

                    <TouchableOpacity className="my-1" onPress={() => navigation.navigate('ArrivalScreen')}>
                        <Text className="text-[#FF6600] font-medium text-lg">Edit destinations</Text>
                    </TouchableOpacity>
                </View>

                <View className="mt-2 mx-5 py-2 flex-row justify-around items-center border-gray-300 border-b">
                    <View className="flex-row space-x-2 items-center">
                        <Image source={require('../../assets/images/cars/mastercard.png')} style={{width: 52, height: 40}} />
                        <Text>****6536</Text>
                        <ChevronDownIcon size={18} fill="black" />
                    </View>
                    <View>
                      <Text className="font-bold text-[15px] text-blue-700">$1300-$1500</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => setVisible(true)} className="flex-row space-x-2 items-center justify-center mt-4">
<                    Image source={require('../../assets/images/cars/cancel.png')} className="w-[25px] h-[25px]" />
                    <Text className="text-center text-xl font-medium text-[#FF6600]">Cancel Ride</Text>
                </TouchableOpacity>
            </View>
        </BottomSheet>
    </View>
  )
}

export default ArrivalScreen

const styles=StyleSheet.create( {
    container: {
      flex:1,
    },
    sheet: {
        position: 'absolute',
        zIndex: 10
    },
    arrow: {
      position: 'absolute',
      top: 0,
      bottom: 0,
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
      flex: 1,
      alignItems: 'center',
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
      },

      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      zIndex:16
    },
  }
  
)