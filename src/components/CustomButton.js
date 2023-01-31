import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useFormikContext} from 'formik';
import { colors } from '../global/styles';
import { ActivityIndicator } from 'react-native';

export default function CustomButton({label, isChecked}) {

  const {handleSubmit, isSubmitting} = useFormikContext() ?? {};

  return (
    <TouchableOpacity
      disabled={!isChecked}
      onPress={isSubmitting ? null : handleSubmit}
      style={[
        styles.button1,
        {backgroundColor: isSubmitting ? 'gray' : colors.primary},
      ]}>
        {isSubmitting ? (
          <ActivityIndicator size={30} color={colors.white} />
        ) : (
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 16,
              color: '#fff',
            }}>
            {label}
          </Text>
        )}
      
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button1: {
    height: 50,
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center",
  },
});
