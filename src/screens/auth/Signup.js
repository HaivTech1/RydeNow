import { View, Text, Image, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState } from 'react'
import { colors, parameters } from '../../global/styles';
import { ChevronLeftIcon, PencilIcon } from 'react-native-heroicons/solid';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import CustomFormik from '../../components/CustomFormik';
import * as yup from 'yup';
import useApp from '../../contexts/context';
import InputField from '../../components/form/InputField';
import CustomButton from '../../components/CustomButton';
import AppNotification from '../../components/AppNotification';
import { updateNotification } from '../../utils/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const initialValues = {
  name: '',
  email: '',
};

const validationSchema = yup.object({
  name: yup.string().trim().required('Name is missing!'),
  email: yup
    .string()
    .email('Invalid email address!')
    .required('Email is missing!'),
});

const Signup = ({route}) => {
  const {setUser, setToken} = useApp();
  const { phone } = route.params;
  const {register} = useApp();
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();

  const [message, setMessage] = useState({
    text: '',
    type: '',
  });

  const handleSignup = async (values, formikActions) => {
      values = {...values, phone: phone}
      const res = await register(values);
      formikActions.setSubmitting(false);
      if (!res.status) {
        updateNotification(setMessage, res.error, 'error');
      }else{
        await AsyncStorage.setItem('user', JSON.stringify(res.user));
        await AsyncStorage.setItem('token', res.token);
        setUser(JSON.stringify(res.user));
        setToken(res.token);
        updateNotification(setMessage, res.message, 'success');
        formikActions.resetForm();
        navigation.navigate('LoginScreen', {phone: res.user.phone});
      }
  };

  return (
    <SafeAreaView style={StyleSheet.container}>
      <View>
          <View>
            <Image source={require('../../../assets/images/profileCar.png')} resizeMode="cover" style={{ 
                  width: SCREEN_WIDTH,
                  borderBottomRightRadius: 35,
                  borderBottomLeftRadius: 35,
                  height: SCREEN_HEIGHT - 450
                }} 
              />
              <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    borderBottomRightRadius: 35,
                    borderBottomLeftRadius: 35
                }}
              />
          </View>

          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
                <View>
                    <ChevronLeftIcon size={24} fill="white" />
                </View>
          </TouchableOpacity>
          
          <View style={styles.overContainer}>
            <View className="">
                <Text className="text-white text-[30px] font-bold text-center]">Welcome Onboard</Text>
                <Text className="text-center text-white text-lg">Create account</Text>
            </View>
          </View>
          
          <View style={styles.profileImageContainer}>
              <Text></Text>
          </View>
          <TouchableOpacity style={styles.pencil}>
            <PencilIcon size={20} fill="white" />
          </TouchableOpacity>
      </View>
      
      <KeyboardAvoidingView className="mt-14 mx-5">
        <CustomFormik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignup}
        >  
           {message.text ? (
            <AppNotification type={message.type} text={message.text} />
          ) : null}

          <View>
                <Text className="font-medium text-gray-500 mb-1">Name</Text>
                <InputField
                    name="name"
                    placeholder="Name"
                />
          </View>

          <View className="mt-2">
                <Text className="font-medium text-gray-500 mb-1">Email Address</Text>
                <InputField 
                  name="email"
                  keyboardType="email-address"
                  placeholder="Enter Email Address"
                />
          </View> 

          <View className="mt-2">
                <Text className="font-medium text-gray-500 mb-1">Password</Text>
                <InputField 
                  name="password"
                  maxLength={4}
                  keyboardType="number-pad"
                  placeholder="4 digit password"
                />
          </View> 

          <View className="flex-row items-center text-lg mt-6 space-x-3">
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={() => {
                  setIsChecked(!isChecked);
                }}
                color={isChecked ? '#FF6600' : undefined}
              />
              <Text>I agree to <Text className="text-[#FF6600]">Terms and conditions</Text></Text>
          </View> 

          <View className="mx-5 mt-12">
            <CustomButton label={'Create Account'} onPress={handleSignup} isChecked={isChecked} />
          </View>
        </CustomFormik>       
      </KeyboardAvoidingView>

      
    </SafeAreaView>
  )
}

export default Signup

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: parameters.statusBarHeight,
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#fff',
  },
  btnContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 50,
    left: 30,
    height: 200
  },
  overContainer: {
    position: 'absolute',
    top: 80,
    left: 70,
    height: 200
  },
  view1: {
    height:30,
    width:30,
    justifyContent:"center",
    alignItems:"center",
    marginTop:2,
  },
  profileImageContainer: {
    position: 'absolute',
    top: 220,
    left: SCREEN_WIDTH / 3,
    height: 100,
    paddingHorizontal: 55,
    paddingVertical: 55,
    backgroundColor: '#D9D9D9',
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 2,
  },
  pencil: {
    position: 'absolute',
    top: 290,
    right: SCREEN_WIDTH - 250,
    backgroundColor: '#B0B0B0',
    padding: 5,
    borderRadius: 100,
    zIndex: 10
  },
  checkbox: {
    borderColor: '#FF6600',
    borderRadius: 5,
    padding: 5
  },
});