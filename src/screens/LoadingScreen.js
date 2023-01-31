import { View, Image, StyleSheet } from 'react-native'
import React from 'react'

const LoadingScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
        <Image style={styles.image} source={ require('../../assets/images/logo.png') } resizeMode="contain"/>
    </View> 
  )
}

export default LoadingScreen

const styles = StyleSheet.create({
  image:{
    width: '100%',
  }
});