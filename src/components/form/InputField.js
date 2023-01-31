import {useFormikContext} from 'formik';
import React from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { colors } from '../../global/styles';
const SCREEN_WIDTH = Dimensions.get('window').width;

const InputField = ({
  name,
  placeholder,
  icon,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  ...rest
}) => {
  const {errors, values, touched, handleChange, handleBlur} =
    useFormikContext();

  const value = values[name];
  const error = errors[name];
  const isInputTouched = touched[name];

  return (
    <>
      {error && isInputTouched ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={handleChange(name)}
          onBlur={handleBlur(name)}
          keyboardType={keyboardType}
          style={{
            backgroundColor: 'transparent',
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 8,
            width: SCREEN_WIDTH - 40,
            paddingHorizontal: 10,
            paddingVertical: 11
          }}
          {...rest}
        />
    </>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: colors.danger,
    // paddingHorizontal: 30,
    paddingVertical: 2
  },
});
export default InputField;
