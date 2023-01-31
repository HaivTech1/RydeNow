import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { colors, parameters } from '../global/styles'
import { ChatBubbleBottomCenterIcon, ChevronLeftIcon, PhoneIcon } from 'react-native-heroicons/solid';

const SupportScreen = ({ navigation }) => {

  const data = [
    {
      id: 1,
      title: 'Phone',
      icon: <PhoneIcon />,
    },
    {
      id: 2,
      title: 'Chat with Us',
      icon: <ChatBubbleBottomCenterIcon />,
    },
    {
      id: 3,
      title: 'Facebook',
      icon: <ChatBubbleBottomCenterIcon />,
    },
    {
      id: 3,
      title: 'Twitter',
      icon: <ChatBubbleBottomCenterIcon />,
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
              keyExtractor={(item, i) => i.toString()}
              renderItem={({item}) => (
                <View className="mt-1">
                    <View className="bg-gray-200 rounded-lg flex-row items-center space-x-2">
                        <item.icon/>
                        <Text className="text-gray-500 text-[10px]">{item.type}</Text>
                    </View>
                </View>
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