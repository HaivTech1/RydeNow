import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const ShareScreen = ({navigation}) => {
    
  return (
    <View style={styles.container}>
        <Image style={styles.image} 
            resizeMode="contain" 
            source={ require('../../../assets/images/shareRide.png') }
        />

        <View>
            <Text className="text-lg font-bold text-center">Plan your Trip</Text>
            <Text className="text-center mt-1">Your trip activity will appear here</Text>
        </View>

        <View className="flex-row justify-center items-end mt-14 mx-14">
          <TouchableOpacity style={styles.button1} onPress={() =>  navigation.navigate('TripsScreen')}>
              <Text className="text-white font-medium text-lg">Get Started</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}

export default ShareScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    image:{
        width: "100%"
    },
    button1: {
        height:40,
        width: '100%',
        backgroundColor: '#FF6600',
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center",
    },
});