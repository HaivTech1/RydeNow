import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { colors, parameters } from '../global/styles'
import { TouchableOpacity } from 'react-native'
import { CalendarDaysIcon, ChevronLeftIcon, ClockIcon, CurrencyDollarIcon } from 'react-native-heroicons/solid'

const ScheduleDetailScreen = ({ route, navigation }) => {
    const {item} = route.params;

  return (
    <SafeAreaView style={styles.container}>
        <View className="px-4 py-3">
            <View className="flex-row items-center space-x-3">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View>
                        <ChevronLeftIcon size={20} fill="black" />
                    </View>
                </TouchableOpacity>
                <Text className="font-normal text-[15px]">Trip Details</Text>
            </View>

            <View className="h-[65%]">
                <Text className="mt-3 text-sm font-normal mx-2">Set on {item.date} {item.time}.</Text>

                <View className="flex-row items-center space-x-1 mt-3 mx-3 border-b py-1 border-gray-300">
                    <Image source={require('../../assets/images/locationGroup.png')} />
                    <View className="">
                        <Text className="text-xs font-medium my-1 py-1">{item.from}</Text>
                        <Text className="text-xs font-medium my-1 py-1">{item.to}</Text>
                    </View>
                </View>

                <View className="mt-4 mx-3">
                    <View className="flex-row justify-between items-center mt-3">
                        <View className="flex-row space-x-1 items-center">
                            <CurrencyDollarIcon size={23} fill="#FF6600" />
                            <Text>Extimated fare</Text>
                        </View>
                        <Text>$120</Text>
                    </View>
                    <View className="flex-row justify-between items-center mt-3">
                        <View className="flex-row space-x-1 items-center">
                            <ClockIcon size={23} fill="#000066" />
                            <Text>Pickup time</Text>
                        </View>
                        <Text>09:00am</Text>
                    </View>
                    <View className="flex-row justify-between items-center mt-3">
                        <View className="flex-row space-x-1 items-center">
                            <CalendarDaysIcon size={23} fill="#000" />
                            <Text>Pickup date</Text>
                        </View>
                        <Text>2022-12-17</Text>
                    </View>
                </View>
            </View>

            <View className="mt-10">
                <View className="flex-row justify-center my-5">
                    <TouchableOpacity style={styles.button1}>
                        <Text className="text-white font-medium text-lg">Edit Details</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-row justify-center">
                    <TouchableOpacity style={styles.button2}>
                        <Text className="text-[#FF6600] font-medium text-lg">Cancel Schedule</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default ScheduleDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: parameters.statusBarHeight,
        backgroundColor: colors.white
    },
    button1: {
        height: 50,
        width: 220,
        backgroundColor: '#FF6600',
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center",
    },

    button2: {
        height: 50,
        width: 220,
        borderRadius: 20,
        borderColor: '#FF6600',
        alignItems:"center",
        justifyContent:"center",
    }
});