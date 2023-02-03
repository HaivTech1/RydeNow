import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import { colors, parameters } from '../global/styles'
import { ChevronLeftIcon } from 'react-native-heroicons/solid'
import { Icon } from 'react-native-vector-icons/Icon';

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
            <Text className="font-normal text-[15px]">About</Text>
        </View>

        <View className="mt-10 mx-3">
              <View className="mx-3">
                  <Image source={require('../../assets/images/invite.png')} />
                  <Text>Refer friend and earn $10 dollars on first trip</Text>
              </View>

              <View>
                  <Text>Referral link</Text>

                  <View style={styles.searchSection}>
                      <Icon style={styles.searchIcon} name="ios-search" size={20} color="#000"/>

                      <TextInput
                          style={styles.input}
                          placeholder="User Nickname"
                          onChangeText={(searchString) => {this.setState({searchString})}}
                          underlineColorAndroid="transparent"
                      />
                  </View>
              </View>
              
              <View className="flex-row justify-center my-5">
                  <TouchableOpacity style={styles.button1}>
                      <Text className="text-white font-medium text-lg">Edit Details</Text>
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
  },
  searchIcon: {
      padding: 10,
  },
  input: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 0,
      backgroundColor: '#fff',
      color: '#424242',
  },
  button1: {
    height: 50,
    width: 220,
    backgroundColor: '#FF6600',
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center",
  },
});