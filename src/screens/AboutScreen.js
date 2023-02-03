import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/solid'
import { colors, parameters } from '../global/styles'

const AboutScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
        <View className="flex-row items-center space-x-3 mt-3">
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View>
                    <ChevronLeftIcon size={20} fill="black" />
                </View>
            </TouchableOpacity>
            <Text className="font-normal text-[15px]">About</Text>
        </View>
        <View className="mt-6 mx-3">
            <Text className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ligula elit, sodales at varius sed, malesuada in quam. In dignissim tortor sit amet ligula condimentum, non pharetra diam vestibulum. Aliquam vitae egestas diam. Morbi cursus id felis non congue. Nullam at nibh ullamcorper, fermentum justo imperdiet, sodales odio. 
            </Text>

            <Text className="mt-5 text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ligula elit, sodales at varius sed, malesuada in quam. In dignissim tortor sit amet ligula condimentum, non pharetra diam vestibulum. Aliquam vitae egestas diam. Morbi cursus id felis non congue. Nullam at nibh ullamcorper, fermentum justo imperdiet, sodales odio. 
            </Text>
        </View>
    </SafeAreaView>
  )
}

export default AboutScreen

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: parameters.statusBarHeight,
      backgroundColor: colors.white,
      paddingHorizontal: 10
  },
});