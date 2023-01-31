import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, ActivityIndicator, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { colors, parameters } from '../global/styles'
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon, CreditCardIcon } from 'react-native-heroicons/solid';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const AddCardScreen = () => {

    const navigation = useNavigation();
    const [cardDetails, setCardDetails] = useState({
        cardName: 'Osifuye Ebunoluwa',
        cardNumber: '2435236475385485',
        exp: '14/12',
        cvv: '332'
    });

    const [isLoading, setIsLoading] = useState();

    const handleAddCard = () => {
        setIsLoading(true);
        navigation.navigate('SelectRideScreen');
    }
    

  return (
    <SafeAreaView style={styles.container}>
        <View className="flex-row justify-between items-center px-4 py-3">
            <View className="flex-row items-center space-x-3">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View>
                        <ChevronLeftIcon size={20} fill="black" />
                    </View>
                </TouchableOpacity>
                <Text className="font-bold text-lg">Add Debit Card</Text>
            </View>
        </View>

        <View className="px-5 mt-5 flex-col">
           <View className="h-[85%]">
                <View>
                    <Text className="font-medium text-gray-500 mb-1">Card Name</Text>
                    <TextInput
                        focusable={true}
                        autoComplete="username"
                        keyboardType="text"
                        maxLength={40}
                        onChangeText={text => onChangeText(text)}
                        placeholder={cardDetails.cardName}
                        style={{
                            backgroundColor: 'transparent',
                            borderColor: 'black',
                            borderWidth: 1,
                            borderRadius: 8,
                            width: SCREEN_WIDTH - 40,
                            padding: 7
                        }}
                    />
                </View>

                <View className="mt-4">
                    <Text className="font-medium text-gray-500 mb-1">Card Number</Text>
                    
                    <View style={{
                        backgroundColor: 'transparent',
                        borderColor: 'black',
                        borderWidth: 1,
                        borderRadius: 8,
                        width: SCREEN_WIDTH - 40,
                        padding: 7,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View className="border-r border-gray-200 mr-4 pr-2 h-full">
                            <CreditCardIcon size={24} fill="black" />
                        </View>
                        <TextInput 
                            autoComplete='cc-number'
                            maxLength={16}
                            keyboardType="numeric"
                            onChangeText={text => setCardDetails({
                                ...cardDetails.cardNumber
                            })}
                            style={{ 
                                flex: 1
                            }}
                            placeholder={cardDetails.cardNumber}
                        
                        />
                        
                    </View>
                </View>

                <View className="flex-row space-x-5 mt-4">
                    <View>
                        <Text className="font-medium text-gray-500 mb-1">Expiry Date</Text>
                        <TextInput
                            focusable={true}
                            autoComplete="username"
                            keyboardType="text"
                            maxLength={40}
                            onChangeText={text => onChangeText(text)}
                            placeholder={cardDetails.exp}
                            style={{
                                backgroundColor: 'transparent',
                                borderColor: 'black',
                                borderWidth: 1,
                                borderRadius: 8,
                                width: SCREEN_WIDTH - 40,
                                padding: 7,
                                width: 120
                            }}
                        />
                    </View>
                    <View>
                        <Text className="font-medium text-gray-500">CVV</Text>
                        <TextInput
                            focusable={true}
                            autoComplete="username"
                            keyboardType="text"
                            maxLength={3}
                            onChangeText={text => onChangeText(text)}
                            placeholder={cardDetails.cvv}
                            style={{
                                backgroundColor: 'transparent',
                                borderColor: 'black',
                                borderWidth: 1,
                                borderRadius: 8,
                                width: SCREEN_WIDTH - 40,
                                padding: 7,
                                width: 120
                            }}
                        />
                    </View>
                </View>

                <View className="text-[2px] font-medium text-gray-500 mt-8 px-3">
                    <Text>Note: Ride Now may charge a small amount to confirm your card details. This is immediately refunded</Text>
                </View>
           </View>

            <View className="flex-row justify-center">
                <TouchableOpacity style={styles.button1} onPress={handleAddCard}>
                    <View className="flex-row space-x-4 items-center">
                        {isLoading && 
                            <ActivityIndicator size="small" color="#fff" />
                        }
                        <Text className="text-white font-medium text-lg">Add Card</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default AddCardScreen

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
    button1: {
        height:40,
        width: 220,
        backgroundColor: '#FF6600',
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center",
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