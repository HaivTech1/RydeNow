import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions, Modal, Pressable } from 'react-native'
import { colors, parameters } from '../global/styles'
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { filterData, carsAround } from '../global/data';
import { mapStyle } from '../global/mapStyle'
import { FontAwesome5 } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;

const RideDetailScreen = ({route, navigation}) => {
    const {item} = route.params;
    const _map = useRef(1);

    const getVehicleImage = (type) => {
      if (type === 'Suv') {
        return require('../../assets/images/cars/suv.png')
      }
  
      if (type === 'Car') {
        return require('../../assets/images/cars/carMarker.png')
      }
  
      if (type === 'Van') {
        return require('../../assets/images/cars/van.png')
      }
    }

    const [modalVisible, setModalVisible] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
        <View className="mx-5 my-5">
            <View className="">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View>
                        <ChevronLeftIcon size={20} fill="black" />
                    </View>
                </TouchableOpacity>
            </View>
            <View className="mt-5 flex-row justify-between items-center">
                <View>
                  <Text className="font-semibold text-[15px]">{item.state}</Text>
                  <Text className="text-[12px] text-gray-300">{item.date}</Text>
                </View>
                <View>
                  <Image source={require('../../assets/images/profile.png')} className="rounded-full w-[45px] h-[45px] bg-gray-300 p-4" />
                </View>
            </View>
        </View>
        <View className="h-[35%]">
          <MapView
            ref={_map}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            customMapStyle={mapStyle}
            showsUserLocation={true}
            followsUserLocation={true}
            initialRegion={{ ...carsAround[0], latitudeDelta: 0.008, longitudeDelta: 0.008}}
          >
              {carsAround.map((item) => 
                <Marker 
                  coordinate={{ latitude: item.latitude, longitude: item.longitude}}
                  key={item.id}
                >
                <Image 
                  source={getVehicleImage(item.type)} 
                  style={{ 
                    width: 28,
                    height: 14,
                    resizeMode: "contain",
                    // transform: [{
                    //   rotate: `${item.heading}deg`,
                    // }]
                   }}
                  resizeMode="cover"
                />
               </Marker>
              )}
          </MapView>
      </View>
      
      <View className="mx-5 mt-3">
          <View className="flex-row items-center space-x-1">
              <Image source={require('../../assets/images/locationGroup.png')} />
              <View className="">
                  <Text className="text-md font-medium my-1 py-1">{item.from}</Text>
                  <Text className="text-md font-medium my-1 py-1">{item.to}</Text>
              </View>
          </View>

          <Text className="mt-5 text-[15px] font-normal">Additional ride details can be found in your email receipt</Text>


          <View className="flex-row justify-center mt-10">
            <TouchableOpacity style={styles.button1} onPress={() => setModalVisible(true)}>
                <Text className="text-white font-medium text-lg">Get help with ride</Text>
            </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <Pressable style={styles.outsideModal}
          onPress={(event) => { if (event.target == event.currentTarget) { 
            setModalVisible(false); } }} >
          <View style={styles.modal}>
            <View>
              <TouchableOpacity onPress={() => setModalVisible(false)} className="flex-row items-center justify-start space-x-2 p-5">
                <FontAwesome5 name="times" size={15} color="black" />
                <Text>Get Help</Text>
              </TouchableOpacity>
            </View>

            <View className="mx-5 mt-3 font-semibold">
              <Text>Ride Issues</Text>
            </View>

          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  )
}

export default RideDetailScreen

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: parameters.statusBarHeight,
      backgroundColor: colors.white
  },
  map:{
    height: '100%',
      width:SCREEN_WIDTH
  },
  button1: {
    height: 50,
    width: 220,
    backgroundColor: '#FF6600',
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center",
  },
  modal: {
    flex: 1,
    padding: 5,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: SCREEN_WIDTH
  },
  /* The content of the modal takes all the vertical space not used by the header. */
  modalContent: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black"
  },
  /* The header takes up all the vertical space not used by the close button. */
  modalHeaderContent: {
    flexGrow: 1,
  },
  modalHeaderCloseText: {
    textAlign: "center",
    paddingLeft: 5,
    paddingRight: 5
  },
  outsideModal: {
    backgroundColor: "rgba(1, 1, 1, 0.2)",
    flex: 1,
  }
});