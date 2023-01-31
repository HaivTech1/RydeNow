import { View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import { colors, parameters } from '../global/styles';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const NotificationScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View className="flex-row justify-between items-center px-4 py-3">
            <View className="flex-row items-center space-x-3">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View>
                        <ChevronLeftIcon size={20} fill="black" />
                    </View>
                </TouchableOpacity>
                <Text className="font-normal text-[15px]">Notifications</Text>
            </View>
      </View>

      <TouchableOpacity className="mx-5 border-b mb-1 border-[#FF6600] flex-row justify-between p-2">
        <View className="flex-row items-center space-x-2">
          <View>
              <Image source={require('../../assets/images/driver.png')} resizeMode="contain" className="rounded-full w-14 h-14" />
          </View>

          <View>
              <Text className="font-medium text-lg">Trip Cancelled</Text>
              <Text>Your trip to shoprite has been...</Text>
          </View>
        </View>

        <View className="mt-2">
          <Text className="text-sm font-normal">10:00AM</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default NotificationScreen

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