import { View, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Alert, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import PhoneInput from "react-native-phone-number-input";
import { colors, parameters } from '../../global/styles';
import { useNavigation } from '@react-navigation/native';


const Login = () => {

    const [formattedValue, setFormattedValue] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);
    const recaptchaVerifier = useRef(null);
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);

    const sendVerification = () => {
        setIsLoading(true);
        setFormattedValue('');
        setIsLoading(false);
    }

    if (isLoading) {
        return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={'large'} color={colors.primary} />
          </View>
        );
    }

  return (
    <SafeAreaView style={styles.container}>
        <View className="">
            <View className="flex-col justify-center items-center">
                <Image source={ require('../../../assets/images/logo.png') } style={{ width: 80, marginBottom: 20, resizeMode: 'contain' }}/>
                <Text className="text-lg font-medium">Welcome back</Text>
                <Text className="mt-1 text-lg">Login</Text>
            </View>

            <View className="flex-row justify-center">
                <TouchableOpacity className="rounded-full flex-row jutify-center items-center">
                    <Image source={require('../../../assets/images/apple.png')} style={{ width: 45, resizeMode: 'contain' }} />
                </TouchableOpacity>
                <TouchableOpacity className="rounded-full px-4 py-3 flex-row jutify-center items-center">
                    <Image source={require('../../../assets/images/google.png')} style={{ width: 45, resizeMode: 'contain' }} />
                </TouchableOpacity>
            </View>

            <View className="flex-row justify-center items-center">
                <Text className="text-lg font-bold">OR</Text>
            </View>

            <KeyboardAvoidingView className="mx-4 w-full">
                <Text className="text-black mx-5 mb-1">Phone Number</Text>
                <View className="mx-5">
                    <PhoneInput
                        ref={phoneInput}
                        defaultValue={''}
                        defaultCode="NG"
                        layout="first"
                        onChangeText={(text) => {
                        setValue(text);
                        }}
                        onChangeFormattedText={(text) => {
                        setFormattedValue(text);
                        }}
                        autoFocus
                        containerStyle={{ 
                            borderWidth: 1,
                            borderColor: '#FF6600',
                            borderRadius: 1,
                            width: '100%',
                        }}
                        flagButtonStyle={{ 
                            borderColor: 'grey',
                            borderRightWidth: 1,
                        }}
                    />
                </View>
                <View className="flex-row justify-center mt-5 mb-2 mx-7">
                    <TouchableOpacity style={styles.button1} onPress={sendVerification}>
                        <Text className="text-white font-medium text-lg">Login</Text>
                    </TouchableOpacity>
                </View>
                <View className="flex-row space-x-2 justify-center items-center">
                    <Text>Don’t have an account yet?</Text>
                    <TouchableOpacity onPress={() =>  navigation.navigate('SignupVerification')}>
                        <Text className="text-[#FF6600] text-lg">Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: parameters.statusBarHeight,
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#fff'
    },
    button1: {
        height: 50,
        width: '100%',
        backgroundColor: '#FF6600',
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center",
    }
});