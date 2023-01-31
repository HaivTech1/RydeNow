import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import { WifiIcon } from 'react-native-heroicons/outline';

const NoInternet = ({onRefreshPress}) => {
  const netInfo = useNetInfo();

  return (
    <View style={styles.container}>
      <WifiIcon size={25} color="#383838" />
      <Text style={{fontSize: 18, color: '#383838', paddingVertical: 5}}>
        No internet connection
      </Text>
      <Pressable
        onPress={onRefreshPress}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="refresh" size={25} color="#383838" />
        <Text style={{fontSize: 18, paddingVertical: 5, marginLeft: 5}}>
          Try Again
        </Text>
      </Pressable>
    </View>
  );
};

export default NoInternet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
