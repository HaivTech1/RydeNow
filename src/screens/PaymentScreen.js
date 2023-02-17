import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, FlatList, Image } from 'react-native'
import React from 'react';
import { colors, parameters } from '../global/styles';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const PaymentScreen = ({ navigation }) => {

  const data = [
    {
      id: 1,
      code: '2344647894635974',
      image: require('../../assets/images/visa.png'),
      expire: '11/26'
    },
    {
      id: 2,
      code: '2344647894635973',
      image: require('../../assets/images/mastercard.png'),
      expire: '11/26'
    },
    {
      id: 3,
      code: '2344647894635973',
      image: require('../../assets/images/paypal.png'),
      expire: '11/26'
    },
  ];

  const maskAccountId = (accountId) => {
    if (accountId) { /** Condition will only executes if accountId is *not* undefined, null, empty, false or 0*/
      const accountIdlength = accountId.length;
      const maskedLength = accountIdlength - 4; /** Modify the length as per your wish */
      let newString = accountId;
      for (let i = 0; i < accountIdlength; i++) {
        if (i < maskedLength) {
          newString = newString.replace(accountId[i], '*');
        }
      }
      return newString;
    } else return /**Will handle if no string is passed */
  }
  
  // console.log(maskAccountId('egrgrgry565yffvfdfdfdfdfgrtrt4t4'));

  return (
    <SafeAreaView style={styles.container}>
       <View className="flex-row justify-between items-center px-4 py-3">
            <View className="flex-row items-center space-x-3 mt-3">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View>
                        <ChevronLeftIcon size={20} fill="black" />
                    </View>
                </TouchableOpacity>
                <Text className="font-normal text-[15px]">Payment Methods</Text>
            </View>
      </View>

      <View className="flex-1 my-3">
          <FlatList 
              data={data}
              keyExtractor={(item, i) => i.toString()}
              renderItem={({item}) => (
                <View className="mt-3 mx-3">
                    <View className="flex-row space-x-5 items-center rounded-lg shadow-sm p-3">
                      <Image source={item.image} style={{ width: 40, height: 40 }} resizeMode="contain"/>
                      <View className="p-2">
                          <Text className="font-medium text-[15px]">{maskAccountId(item.code)}</Text>
                          <Text className="text-gray-400 text-[12px]">expires {item.expire}</Text>
                      </View>
                    </View>
                </View>
              )}
          />
      </View>
    </SafeAreaView>
  )
}

export default PaymentScreen

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
      marginTop:10,
      borderRadius: 100
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