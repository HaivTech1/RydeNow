import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import { useSelector } from 'react-redux';
import { selectOrigin } from '../../src/global/slices/navSlice';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const Map = () => {

    const origin = useSelector(selectOrigin);

  return (
    <MapView
        style={styles.map} 
        className="flex-1"
        mapType='mutedStandard'
        initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        }}
    >
        {origin?.location && (
            <Marker
                coordinate={{ 
                    latitude: origin.location.lat,
                    longitude: origin.location.lng,
                }}
                title="Latitude"
                description='vSSgGS'
                identifier='origin'
            />
        )}
    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({
    map:{
        height: '100%',
        width:SCREEN_WIDTH
    },
})