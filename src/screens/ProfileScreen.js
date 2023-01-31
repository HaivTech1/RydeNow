import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { colors, parameters } from '../global/styles'
import { BriefcaseIcon, ChevronLeftIcon, HomeIcon, PencilIcon, StarIcon } from 'react-native-heroicons/solid'
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet'

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
         <View className="">
            <View className="flex-row justify-between items-center mx-5 h-[5%]">
                <View className="flex-row items-center space-x-3">
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                      <View>
                          <ChevronLeftIcon size={20} fill="white" />
                      </View>
                  </TouchableOpacity>
                  <Text className="font-normal text-white text-[15px]">Profile</Text>
                </View>
                
                <TouchableOpacity onPress={() => navigation.navigate('ProfileEditScreen')}>
                  <PencilIcon size={18} fill="white" />
                </TouchableOpacity>
            </View>

            <View className="flex-row items-center space-x-1 my-3 mx-5">
              <Image source={require('../../assets/images/profile.png')} 
                className="rounded-full w-[45px] h-[45px] bg-gray-300 p-4 border-2 border-white" 
              />
              <View>
                <Text className="text-white">Ebunoluwa Osifuye</Text>
                <View className="flex-row items-center">
                    <StarIcon size={12} fill="yellow" />
                    <Text className="text-[9px] text-white">4.5</Text>
                </View>
              </View>
            </View>

            <View className="h-full mt-20 bg-gray-200 rounded-tl-[40px] rounded-tr-[40px] relative">
                <View style={styles.box}>
                    <View className="border-b border-gray-200 px-2 py-1">
                      <Text className="text-gray-500">Today's Earning</Text>
                      <Text className="text-lg font-normal">$2300</Text>
                    </View>
                    <View className="p-2 flex-row space-x-5 my-2">
                        <View>
                            <Text className="text-gray-600">Total trips</Text>
                            <Text className="text-lg font-normal">130</Text>
                        </View>
                        <View>
                            <Text className="text-gray-600">Total trip time</Text>
                            <Text className="text-lg font-normal">40h</Text>
                        </View>
                        <View>
                            <Text className="text-gray-600">Total distance</Text>
                            <Text className="text-lg font-normal">1000km</Text>
                        </View>
                    </View>
                </View>

                <View className="p-5 bg-gray-100 rounded-tl-[40px] rounded-tr-[40px]">
                    <Text className="text-lg font-normal mt-28">Favourite locations</Text>
                      <View className="flex-row items-center space-x-2">
                          <HomeIcon size={23} fill="black" />
                          <View>
                              <Text>Home</Text>
                              <Text className="text-gray-500">234 Canada street</Text>
                          </View>
                      </View>
                      <TouchableOpacity className="flex-row items-center space-x-2 my-3">
                          <BriefcaseIcon size={23} fill="black" />
                          <View>
                              <Text className="text-sm">Enter work location</Text>
                          </View>
                      </TouchableOpacity>
                </View>
                
                <TouchableOpacity className="p-5 bg-white mt-3">
                  <Text className="text-lg font-normal">Language</Text>
                  <Text className="text-gray-500">English-(US)</Text>
                </TouchableOpacity>
            </View>
          </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: parameters.statusBarHeight,
      backgroundColor: colors.primary
  },
  box: {
    position: 'absolute',
    width: SCREEN_WIDTH - 50,
    height: 150,
    zIndex: 100,
    top: -50,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 5,
    shadowRadius: 100,
    shadowColor: colors.black,
  }
});