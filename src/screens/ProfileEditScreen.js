import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Dimensions } from 'react-native'
import React from 'react'
import { colors, parameters } from '../global/styles'
import { ChevronLeftIcon, PencilIcon } from 'react-native-heroicons/solid'
import { ScrollView } from 'react-native'
import CustomFormik from '../components/CustomFormik';
import * as yup from 'yup';
import CustomButton from '../components/CustomButton'
import { useState } from 'react'
import AppNotification from '../components/AppNotification'
import InputField from '../components/form/InputField';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
};
  
const validationSchema = yup.object({
    name: yup.string().trim().required('Name is missing!'),
    email: yup
      .string()
      .email('Invalid email address!')
      .required('Email is missing!'),
});

const ProfileEditScreen = ({ navigation }) => {
    const [isChecked, setIsChecked] = useState(true);
    const [message, setMessage] = useState({
        text: '',
        type: '',
    });

    const handleSubmit = () => {

    };
    
  return (
    <SafeAreaView style={styles.container}>
        {message.text ? (
                <AppNotification type={message.type} text={message.text} />
        ) : null}
      
        <View className="flex-row justify-between items-center mx-5 mt-1 h-[5%]">
            <View className="flex-row items-center space-x-3 p-3">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View>
                        <ChevronLeftIcon size={20} fill="black" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        
        <ScrollView>
            <KeyboardAvoidingView className="mx-5">
                <View className="flex-row justify-center">
                    <View style={styles.profileImageContainer}>
                        <View></View>
                        <TouchableOpacity style={styles.pencil}>
                            <PencilIcon size={16} fill="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                <CustomFormik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <View>
                        <View className="mt-6">
                            <Text className="font-medium text-gray-500 mb-1">First Name</Text>
                            <InputField 
                                name="firstName"
                                keyboardType="text"
                                placeholder="Enter first Name"
                            />
                        </View>
                        <View className="mt-6">
                            <Text className="font-medium text-gray-500 mb-1">Last Name</Text>
                            <InputField 
                                name="lastName"
                                keyboardType="text"
                                placeholder="Enter last Name"
                            />
                        </View>
                        <View className="mt-6">
                            <Text className="font-medium text-gray-500 mb-1">Email Address</Text>
                            <InputField 
                                name="email"
                                keyboardType="email-address"
                                placeholder="Enter Email Address"
                            />
                        </View>
                        <View className="mt-6">
                            <Text className="font-medium text-gray-500 mb-1">Password</Text>
                            <InputField 
                                name="password"
                                keyboardType="password"
                            />
                        </View>

                        <View className="mx-5 mt-20">
                            <CustomButton label={'Update'} onPress={handleSubmit} isChecked={isChecked} />
                        </View>
                    </View>
                </CustomFormik>
            </KeyboardAvoidingView>
        </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileEditScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: parameters.statusBarHeight,
        backgroundColor: colors.white
    },
    profileImageContainer: {
        width: SCREEN_WIDTH - 300,
        height: 15,
        paddingHorizontal: 60,
        paddingVertical: 60,
        backgroundColor: '#D9D9D9',
        borderRadius: 100,
        borderColor: 'white',
        borderWidth: 2,
    },
    pencil: {
        position: 'absolute',
        top: 80,
        right: SCREEN_WIDTH - 390,
        backgroundColor: '#B0B0B0',
        padding: 5,
        borderRadius: 100,
        zIndex: 10
    },
    imageContainer:{
        height: 40,
        padding: 10
    }
});