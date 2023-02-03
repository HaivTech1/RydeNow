import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/solid'
import { colors, parameters } from '../global/styles'

const PolicyScreen = ({ navigation }) => {

  const data = [
    {
      id: 1,
      title: 'Privacy Statement',
      description: 'This privacy Statement explains our practices, including your choices, regarding the collection use, anddisclosure of certain information, in connection with our service'
    },
    {
      id: 2,
      title: 'Contacting Us',
      description: 'This privacy Statement explains our practices, including your choices, regarding the collection use, anddisclosure of certain information, in connection with our service'
    },
    {
      id: 3,
      title: 'Collecting of information',
      description: 'This privacy Statement explains our practices, including your choices, regarding the collection use, anddisclosure of certain information, in connection with our service'
    },
    {
      id: 4,
      title: 'Disclosure of Information',
      description: 'This privacy Statement explains our practices, including your choices, regarding the collection use, anddisclosure of certain information, in connection with our service'
    },
  ]
  return (
    <SafeAreaView style={styles.container}>
        <View className="flex-row items-center space-x-3 mt-5">
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View>
                    <ChevronLeftIcon size={20} fill="black" />
                </View>
            </TouchableOpacity>
            <Text className="font-normal text-[15px]">Privacy Policy</Text>
        </View>

        <View className="mt-6 mx-3 py-5 mb-2">
            <FlatList
              data={data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => (
                <View className="my-2">
                    <Text className="mb-2 text-lg">{item.title}</Text>
                    <Text className="text-[13px] text-gray-600 word-break: break-all tracking-wide leading-5">{item.description}</Text>
                </View>
              )}
            />
        </View>
    </SafeAreaView>
  )
}

export default PolicyScreen

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: parameters.statusBarHeight,
      backgroundColor: colors.white,
      paddingHorizontal: 10
  },
});