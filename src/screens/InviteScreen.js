import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native'
import React from 'react'
import { colors, parameters } from '../global/styles'
import { ChevronLeftIcon } from 'react-native-heroicons/solid'
import Ionicons from '@expo/vector-icons/Ionicons';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const InviteScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
        <View className="flex-row items-center space-x-3 mt-3">
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View>
                    <ChevronLeftIcon size={20} fill="black" />
                </View>
            </TouchableOpacity>
            <Text className="font-normal text-[15px]">Invite friends</Text>
        </View>

        <View className="mt-10 mx-3">
              <View className="mx-3">
                  <View className="flex-row justify-center mt-10">
                        <Image source={require('../../assets/images/friends.png')} />
                  </View>
                  <Text className="text-center text-gray-600 text-[12px]">Refer friend and earn $10 dollars on first trip</Text>
              </View>

              <View className="mt-5">
                  <Text className="mb-1">Referral link</Text>

                  <View className="flex-row items-center border border-black rounded-lg p-1">
                      <TextInput
                          style={styles.input}
                          placeholder="4575893"
                          onChangeText={(text) => {console.log(text)}}
                          underlineColorAndroid="transparent"
                      />
                      <TouchableOpacity>
                        <Ionicons style={styles.searchIcon} name="copy-sharp" size={20} color="#000"/>
                      </TouchableOpacity>
                  </View>
              </View>
              
              <View className="flex-row justify-center my-10">
                  <TouchableOpacity style={styles.button1}>
                      <Text className="text-white font-medium text-[15px]">Share Code</Text>
                  </TouchableOpacity>
              </View>
        </View>
    </SafeAreaView>
  )
}

export default InviteScreen

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: parameters.statusBarHeight,
      backgroundColor: colors.white,
      paddingHorizontal: 10
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 10,
  },
  searchIcon: {
      padding: 10,
  },
  input: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 5,
      backgroundColor: '#fff',
      color: '#424242',
  },
  button1: {
    height: 45,
    width: SCREEN_WIDTH - 50,
    backgroundColor: '#FF6600',
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center",
  },
});