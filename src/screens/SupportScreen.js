import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Linking } from 'react-native'
import React from 'react'
import { colors, parameters } from '../global/styles'
import { ChatBubbleBottomCenterIcon, ChevronLeftIcon, PhoneIcon } from 'react-native-heroicons/solid';

const SupportScreen = ({ navigation }) => {

  const data = [
    {
      id: 1,
      title: 'Phone',
      link: '09066100815',
      Icon: PhoneIcon,
    },
    {
      id: 2,
      title: 'Chat with Us',
      link: 'facebook.com',
      Icon: ChatBubbleBottomCenterIcon,
    },
    {
      id: 3,
      title: 'Facebook',
      link: 'facebook.com',
      Icon: ChatBubbleBottomCenterIcon,
    },
    {
      id: 4,
      title: 'Twitter',
      link: 'twitter.com',
      Icon: ChatBubbleBottomCenterIcon,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
        <View className="flex-row items-center space-x-3 mt-3">
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View>
                    <ChevronLeftIcon size={20} fill="black" />
                </View>
            </TouchableOpacity>
            <Text className="font-normal text-[15px]">Support</Text>
        </View>
        <View className="mt-10 mx-3">
            <Text className="font-medium text-[15px] text-gray-500">Contact us</Text>

            <FlatList 
              data={data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => Linking.openURL(item.link)} className="mt-1">
                    <View className="bg-gray-200 rounded-lg flex-row items-center space-x-2 p-3 my-1">
                        {/* <item.Icon /> */}
                        <Text className="text-gray-500 text-[10px]">{item.title}</Text>
                    </View>
                </TouchableOpacity>
              )}
            />
        </View>
    </SafeAreaView>
  )
}

export default SupportScreen

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: parameters.statusBarHeight,
      backgroundColor: colors.white,
      paddingHorizontal: 10
  },
});