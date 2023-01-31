import {StyleSheet, Text, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { colors } from '../global/styles';

const AppNotification = ({type, text}) => {
  const height = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(height, {
      toValue: 30,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, []);

  const backgroundColor = type === 'error' ? colors.danger : colors.success;

  return (
    <SafeAreaView>
      <Animated.View style={[styles.container, {height, backgroundColor}]}>
        <Text style={{color: colors.white, fontSize: 16}}>{text}</Text>
      </Animated.View>
    </SafeAreaView>
  );
};

export default AppNotification;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
});
