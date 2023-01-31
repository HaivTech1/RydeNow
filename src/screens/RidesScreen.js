import React, { useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import { colors, parameters } from '../global/styles'
import { ChevronLeftIcon } from 'react-native-heroicons/solid'

const RidesScreen = ({ navigation }) => {

  const [status, setStatus] = useState('Past trips');
  const [datalist, setDatalist] = useState(data);

  const setStatusFilter = (status) => {
    // if (status !== "Past trips") {
    //   setDatalist([...data.filter(e => e.status === status)])
    // }else{
    //   setDatalist(data);
    // }
    setStatus(status);
  }

  const tabList = [
    {
      status: 'Past trips'
    },
    {
      status: 'Scheduled trips'
    }
  ];

  const data = [
    {
      name: 'Dec 2022',
      items: [
        {
          id: '1',
          from: 'Harmony Hotel Kwara state',
          to: 'Shopping Mall, Fate road',
          image: '../../assets/images/ride.png',
          state: 'Ride Cancelled',
          price: '$0',
          date: '15, Dec. 11:00AM'
        },
        {
          id: '2',
          from: 'Harmony Hotel Kwara state',
          to: 'Shopping Mall, Fate road',
          image: '../../assets/images/ride.png',
          state: 'Ride Completed',
          price: '$100',
          date: '15, Dec. 11:00AM'
        },
        {
          id: '3',
          from: 'Harmony Hotel Kwara state',
          to: 'Shopping Mall, Fate road',
          image: '../../assets/images/ride.png',
          state: 'Ride Completed',
          price: '$100',
          date: '16, Dec. 11:00AM'
        },
      ]
    },
    {
      name: 'Nov 2022',
      items: [
        {
          image: '../../assets/images/ride.png',
          state: 'Ride Cancelled',
          price: '$0',
          date: '15, Dec. 11:00AM'
        },
        {
          image: '../../assets/images/ride.png',
          state: 'Ride Completed',
          price: '$100',
          date: '15, Dec. 11:00AM'
        },
        {
          image: '../../assets/images/ride.png',
          state: 'Ride Completed',
          price: '$100',
          date: '16, Dec. 11:00AM'
        },
      ]
    }
  ]

  const dataSchedule = [
    {
      id: '1',
      from: 'Harmony Hotel Kwara state',
      to: 'Shopping Mall, Fate road',
      price: '$400',
      time: '11:00AM',
      date: '15, Dec 2022',
      state: 'Ride Cancelled',
    },
    {
      id: '2',
      from: 'Harmony Hotel Kwara state',
      to: 'Shopping Mall, Fate road',
      price: '$400',
      time: '11:00AM',
      date: '15, Dec 2022',
      state: 'Ride Cancelled',
    },
    {
      id: '3',
      from: 'Harmony Hotel Kwara state',
      to: 'Shopping Mall, Fate road',
      price: '$400',
      time: '11:00AM',
      date: '15, Dec 2022',
      state: 'Ride Cancelled',
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <View className="px-4 py-3 border-b-4 border-gray-200">
          <View className="flex-row items-center space-x-3">
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <View>
                      <ChevronLeftIcon size={20} fill="black" />
                  </View>
              </TouchableOpacity>
              <Text className="font-normal text-[15px]">Your rides</Text>
          </View>
          <View className="flex-row justify-between mx-10 mt-5">
                {tabList.map((e, index) => (
                  <TouchableOpacity onPress={() => setStatusFilter(e.status)} key={index} className={status === e.status ? 'border-b border-[#FF6600]' : ''}>
                    <Text className={status === e.status ? 'text-[#FF6600]' : 'text-gray-500'}>{e.status}</Text>
                  </TouchableOpacity>
                ))}
          </View>
      </View>
      
      {status === 'Past trips' ? (
        <View>
            <FlatList 
              data={data}
              keyExtractor={(item, i) => i.toString()}
              renderItem={({item}) => (
                <View className="mx-5 mt-3">
                  <Text>{item.name}</Text>

                  {item.items.map((item, index) => (
                    <TouchableOpacity onPress={() => navigation.navigate('RideDetailScreen',{item})} key={index} className="flex-row justify-between  border-b-2 border-gray-200 py-2">
                      <View className="flex-row items-center space-x-2">
                          <View>
                              <Image source={require('../../assets/images/driver.png')} resizeMode="contain" className="rounded-full w-7 h-7" />
                          </View>
    
                          <View>
                              <Text className="font-medium text-sm">shoprite Mall, Ikeja Lagos</Text>
                              <Text className="text-xs">16 Dec. 10:00AM</Text>
                          </View>
                      </View>
    
                      <View className="mt-2">
                        <Text className="text-xs font-normal text-[#000066] text-right">$100</Text>
                        <Text className="text-xs">Ride Completed</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            />
        </View>
      ) : (
        <View>
            <FlatList 
              data={dataSchedule}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <TouchableOpacity  onPress={() => navigation.navigate('ScheduleDetailScreen',{item})}  className="border-b border-gray-300 mx-5">
                  <View className="flex-row justify-between items-center mt-2">
                    <Text className="text-[10px]">{item.date}</Text>
                    <Text className="text-[10px]">{item.time}</Text>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center space-x-1">
                        <Image source={require('../../assets/images/locationGroup.png')} />
                        <View className="">
                            <Text className="text-md font-medium my-1 py-1">{item.from}</Text>
                            <Text className="text-md font-medium my-1 py-1">{item.to}</Text>
                        </View>
                    </View>
                    <View>
                      <Text className="font-bold">$400</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
        </View>
      )}
    </SafeAreaView>
  )
}

export default RidesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: parameters.statusBarHeight,
        backgroundColor: colors.white
    },
});