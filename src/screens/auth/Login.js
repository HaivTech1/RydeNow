import { View, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Alert, SafeAreaView, ActivityIndicator, Dimensions, TextInput } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import PhoneInput from "react-native-phone-number-input";
import { colors, parameters } from '../../global/styles';
import { useNavigation } from '@react-navigation/native';
import useApp from '../../contexts/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const inputs = Array(4).fill('');
let newInputIndex = 0;
const isObjectValid = obj => {
  return Object.values(obj).every(val => val.trim());
};

const Login = () => {
    const {user, login, isLoading, setToken, setUser} = useApp();
    // const val = user.phone.toString().slice(4);
    const [formattedValue, setFormattedValue] = useState(user ? user.phone : '');
    const [password, setPassword] = useState('');
    const input = useRef();
    const [nextInputIndex, setNextInputIndex] = useState(0);
    const [OTP, setOTP] = useState({
      0: '',
      1: '',
      2: '',
      3: '',
    });
    
    const phoneInput = useRef(null);
    const navigation = useNavigation();

    const handleChangeText = async (text, index) => {
        const newOTP = {...OTP};
        newOTP[index] = text;
        setOTP(newOTP);
    
        const lastInputIndex = inputs.length - 1;
        if (!text) newInputIndex = index === 0 ? 0 : index - 1;
        else newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
        setNextInputIndex(newInputIndex);

        if (lastInputIndex) {
            if (isObjectValid(OTP)) {
                let val = '';
                Object.values(OTP).forEach(v => {
                    val += v;
                });
                const res = await login(formattedValue, val);
                if (res.status){
                    console.log(res.user.phone);
                    await AsyncStorage.setItem('user', JSON.stringify(res.user));
                    await AsyncStorage.setItem('token', res.token);
                    setToken(res.token);
                    setUser(res.user);
                    
                };
            }
        }
    };

    useEffect(() => {
        input.current.focus();
    }, [nextInputIndex]);

    // const handleLogn = async () => {
    //     console.log(formattedValue, password)
    //     // const res = await login(formattedValue, password);
    //     // if (res.status) setToken(res.token);
    // }

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
                <Text className="text-lg font-normal">Welcome back {user?.name}</Text>
                <Text className="mt-1 text-xs text-gray-400">Login to your account</Text>
            </View>

            {/* <View className="flex-row justify-center">
                <TouchableOpacity className="rounded-full flex-row jutify-center items-center">
                    <Image source={require('../../../assets/images/apple.png')} style={{ width: 45, resizeMode: 'contain' }} />
                </TouchableOpacity>
                <TouchableOpacity className="rounded-full px-4 py-3 flex-row jutify-center items-center">
                    <Image source={require('../../../assets/images/google.png')} style={{ width: 45, resizeMode: 'contain' }} />
                </TouchableOpacity>
            </View>

            <View className="flex-row justify-center items-center">
                <Text className="text-lg font-bold">OR</Text>
            </View> */}

            <KeyboardAvoidingView className="mx-auto w-full">
                {!user && (
                    <>
                        <Text className="text-black mx-5 mb-1">Phone Number</Text>
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
                    </>
                )}

                <View className="mt-3 mx-5">
                    <View style={styles.otpContainer}>
                        {inputs.map((inp, index) => {
                        return (
                            <View style={styles.inputContainer} key={index.toString()}>
                                <TextInput
                                    value={OTP[index]}
                                    onChangeText={text => handleChangeText(text, index)}
                                    style={styles.input}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    ref={nextInputIndex === index ? input : null}
                                />
                            </View>
                        );
                        })}
                    </View>
                </View>

                {/* <View className="flex-row justify-center mt-5 mb-2 mx-7">
                    <TouchableOpacity style={styles.button1}>
                        <Text className="text-white font-medium text-lg">Login</Text>
                    </TouchableOpacity>
                </View> */}
                
                <View className="flex-row space-x-2 justify-center items-center mt-3">
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

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const inputWidth = Math.round(SCREEN_WIDTH / 7);

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
    },
    otpContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        paddingHorizontal: inputWidth / 1,
        marginVertical: 4,
      },
    inputContainer: {
        width: inputWidth,
        height: inputWidth,
        borderWidth: 1,
        borderColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 3
    },
    input: {
        fontSize: 20,
        padding: 15,
    },
});