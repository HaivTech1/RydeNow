import { View, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Alert, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import PhoneInput from "react-native-phone-number-input";
import { colors, parameters } from '../../global/styles';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import AppNotification from '../../components/AppNotification';
import useApp from '../../contexts/context';
import { updateNotification } from '../../utils/helper';


const SignupVerification = () => {

    const [formattedValue, setFormattedValue] = useState("");
    const phoneInput = useRef(null);
    const navigation = useNavigation();
    const [message, setMessage] = useState({
        text: '',
        type: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const { sendCode } = useApp();

    const sendVerification = async() => {
        setIsLoading(true);
        const res = await sendCode(formattedValue);
        if (!res.status){
            setIsLoading(false);
            updateNotification(setMessage, res.error, 'error');
        }else{
            updateNotification(setMessage, res.message, 'success');
            setIsLoading(false);
            setFormattedValue('');
            navigation.navigate('VerificationScreen', {phone: res.phone, expires: res.expires});
        }
    }

  return (
    <SafeAreaView style={styles.container}>
        {message.text ? (
            <AppNotification type={message.type} text={message.text} />
        ) : null}
        
        <View className="flex-row justify-between items-center px-4 py-3">
            <View className="flex-row items-center space-x-3 mt-3">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View>
                        <ChevronLeftIcon size={20} fill="black" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>

        <View className="mt-5">
            <Text className="text-center text-xl font-semibold">Enter Phone number</Text>
            <Text className="text-center mt-2 text-[20px] mx-6">A 4-digit code will be sent to your number</Text>
        </View>

        <KeyboardAvoidingView className="mt-12">
            <Text className="text-black mx-4 mb-1">Enter Phone Number</Text>
            <View className="mx-5">
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={formattedValue}
                    defaultCode="NG"
                    layout="first"
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
            <View className="flex-row justify-center my-5 mx-5">
                <TouchableOpacity disabled={isLoading} style={styles.button1} onPress={sendVerification}>
                    {isLoading ? (
                        <ActivityIndicator size={30} color="white" />
                    ) : (
                        <Text className="text-white font-medium text-lg">Proceed</Text>
                    )}
                    
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>

    </SafeAreaView>
  )
}

export default SignupVerification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: parameters.statusBarHeight,
        backgroundColor: colors.white
    },
    button1: {
        height: 40,
        width: '100%',
        backgroundColor: '#FF6600',
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center",
    }
});