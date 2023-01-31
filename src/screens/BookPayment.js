import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { colors, parameters } from '../global/styles'
import MapComponent from '../components/MapComponent';
import { DestinationContext, OriginContext, PaymentContext } from '../contexts/context';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import Checkbox from 'expo-checkbox';
import { paymentOptions } from '../global/data';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const BookPayment = () => {

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
    })

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

    const [currentPaymentMethod, setCurrentPaymentMethod] = useState(payment.type);

    const handleConfirm = () => {
        if(currentPaymentMethod === 'Debit Card'){
          navigation.navigate('AddCardScreen');
        }
        if(currentPaymentMethod === 'Card' || currentPaymentMethod === 'PayPal'){
          navigation.navigate('SelectRideScreen');
        }
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

      <View style={styles.small}>
          <Text className="font-medium text-xl mb-1 px-5 text-center">Select Payment Method</Text>

          <View className="flex-row justify-center my-4">
            <View>
                {paymentOptions.map((item, index) => (
                    <View className="flex-row items-center" key={index.toString()}>
                        <Checkbox
                            style={styles.checkbox}
                            value={currentPaymentMethod === item.text}
                            onValueChange={() => {
                                setCurrentPaymentMethod(item.text);
                                setPaymentOrigin({
                                  type: 'ADD_PAYMENT', payload: {
                                    type: item.text
                                  }
                                });
                            }}
                            color={currentPaymentMethod === item.text ? '#FF6600' : undefined}
                        />
                        <Text className="font-thin text-lg">{item.text}</Text>
                    </View>
                ))}
            </View>
          </View>

         <View className="flex-row justify-center">
            <TouchableOpacity style={styles.button1} onPress={handleConfirm}>
                <Text className="text-white font-medium text-lg">Confirm</Text>
            </TouchableOpacity>
         </View>

      </View>
    </View>
  )
}

export default BookPayment

const styles=StyleSheet.create( {
    container1: {
      flex:1,
      paddingTop: parameters.statusBarHeight,

    },
    checkbox: {
        margin: 8,
        borderRadius: 17,
        borderColor: '#FF6600'
    },
    arrow: {
      position: 'absolute',
      top: 0,
      bottom: 0,
    },

    small: {
      zIndex: 10, 
      position:"absolute", 
      bottom:0,
      backgroundColor: "#FFFFFF",
      width: '100%',
      borderTopRightRadius: 25,
      borderTopLeftRadius: 25,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },

    container: {
      flex: 1,
      paddingTop:parameters.statusBarHeight
    },

    contentContainer: {
      flex: 1,
      alignItems: 'center',

    },

    view1: {
      position:"absolute",
      top:45,
      left:15,
      backgroundColor:colors.grey,
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