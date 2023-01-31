import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, TextInput, FlatList } from 'react-native'
import React from 'react'
import { colors, parameters } from '../global/styles'
import { ChevronLeftIcon } from 'react-native-heroicons/solid';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const PromotionScreen = ({ navigation }) => {

  const data = [
    {
      id: 1,
      title: '20% promo for 2 rides',
      type: 'Maximum promo $200',
      duration: '10 hours left'
    },
    {
      id: 2,
      title: '20% promo for 2 rides',
      type: 'Maximum promo $200',
      duration: '10 hours left'
    },
    {
      id: 3,
      title: '20% promo for 2 rides',
      type: 'Maximum promo $200',
      duration: '10 hours left'
    },
  ]
  return (
    <SafeAreaView style={styles.container}>
        <View className="flex-row items-center space-x-3 mt-3">
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View>
                    <ChevronLeftIcon size={20} fill="black" />
                </View>
            </TouchableOpacity>
            <Text className="font-normal text-[15px]">Promotions</Text>
        </View>

        <View className="mt-6 border-b-4 border-gray-200">
            <View className="mx-3 mb-4">
              <Text className="font-medium text-[12px] text-gray-500 mb-1">Promo Code</Text>
              <TextInput
                  value=''
                  placeholder="Enter promo code"
                  placeholderTextColor="gray"
                  onChangeText={() => console.log()}
                  keyboardType={'textinput'}
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: 'black',
                    borderWidth: 1,
                    borderRadius: 8,
                    width: SCREEN_WIDTH - 40,
                    paddingHorizontal: 10,
                    paddingVertical: 8
                  }}
              />
            </View>
        </View>

        <View className="mt-3 mx-3">
            <Text className="font-medium text-[15px] text-gray-500 mb-1">Your Promotions</Text>

            <FlatList 
              data={data}
              keyExtractor={(item, i) => i.toString()}
              renderItem={({item}) => (
                <View className="mt-3">
                    <View className="bg-gray-200 rounded-lg p-2">
                        <Text className="font-medium text-[13px]">{item.title}</Text>
                        <Text className="text-gray-500 text-[10px]">{item.type}</Text>
                        <Text className="text-gray-500 text-[10px]">{item.duration}</Text>
                    </View>
                </View>
              )}
            />
        </View>
    </SafeAreaView>
  )
}

export default PromotionScreen

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: parameters.statusBarHeight,
      backgroundColor: colors.white,
      paddingHorizontal: 10
  },
});