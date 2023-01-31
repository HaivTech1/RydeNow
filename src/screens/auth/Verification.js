import { View, Text, StyleSheet, Dimensions, TouchableOpacity, KeyboardAvoidingView, TextInput, Alert, ActivityIndicator, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, parameters } from '../../global/styles';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import AppNotification from '../../components/AppNotification';
import Verifying from '../../components/Verifying';
import useApp from '../../contexts/context';
import { updateNotification } from '../../utils/helper';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;


const inputs = Array(4).fill('');
let newInputIndex = 0;
const isObjectValid = obj => {
  return Object.values(obj).every(val => val.trim());
};

const Verification = ({route, navigation}) => {
  const {VerifyPhone} = useApp();
  const { phone, expires } = route.params;
  const [visible, setVisible] = useState(false);

  // const {profile} = route.params;
  const input = React.useRef();
  const [nextInputIndex, setNextInputIndex] = useState(0);
  const [OTP, setOTP] = useState({
    0: '',
    1: '',
    2: '',
    3: '',
  });

  const [message, setMessage] = useState({
    text: '',
    type: '',
  });

  const handleChangeText = (text, index) => {
    const newOTP = {...OTP};
    newOTP[index] = text;
    setOTP(newOTP);

    const lastInputIndex = inputs.length - 1;
    if (!text) newInputIndex = index === 0 ? 0 : index - 1;
    else newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
    setNextInputIndex(newInputIndex);
  };

  useEffect(() => {
    input.current.focus();
  }, [nextInputIndex]);

  const [counter, setCounter] = useState(expires);

  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);


  const confirmCode = async() => {
    setVisible(true);
    Keyboard.dismiss();

    if (isObjectValid(OTP)) {
      let val = '';
      Object.values(OTP).forEach(v => {
        val += v;
      });
      const res = await VerifyPhone(phone, val)
      if (!res.status){
        setVisible(false);
        updateNotification(setMessage, res.error);
      }else{
        updateNotification(setMessage, res.message);
        setVisible(false);
        setOTP({});
        navigation.push('SignupScreen', {phone: phone});
      }
    }
  }

  return (
    <>
      {message.text ? (
        <AppNotification type={message.type} text={message.text} />
      ) : null}

      <View style={styles.container}>
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
            <Text className="text-center text-lg font-bold">Verification Code</Text>
            <Text className="text-center">Enter 4-digit code sent to 091****15263</Text>
        </View>

        <KeyboardAvoidingView className="mt-10">
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
        </KeyboardAvoidingView>

        <View className="my-5">
            <Text className="text-center">00:{counter}</Text>

            <TouchableOpacity className="my-3">
                <Text className="text-center text-[#FF6600]">Resend code</Text>
            </TouchableOpacity>
        </View>

        <View className="flex-row justify-center my-5 mx-5">
          <TouchableOpacity disabled={visible} style={styles.button1} onPress={confirmCode}>
              <Text className="text-white font-medium text-lg">Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Verifying visible={visible} setVisible={setVisible} />
    </>
  )
}

export default Verification

const inputWidth = Math.round(SCREEN_WIDTH / 6);

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: parameters.statusBarHeight,
      backgroundColor: colors.white
  },
  button1: {
    height: 50,
    width: '100%',
    backgroundColor: '#FF6600',
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center",
  },
  view1: {
      position:"absolute",
      top:25,
      left:12,
      backgroundColor:colors.white,
      height:40,
      width:40,
      borderRadius:20,
      justifyContent:"center",
      alignItems:"center",
      marginTop:2,
      zIndex: 8
  },
  view2: {
      height: SCREEN_HEIGHT*0.21,
      alignItems: 'center',
      zIndex: 5,
      backgroundColor: colors.white
  },
  view3: {
    flexDirection:"row",
    alignItems:"center",
    marginTop:2,
    marginBottom:10,
    backgroundColor: colors.white,
    //height:30,
    zIndex:10,
  },
  view4:{
    flexDirection:"row",
    alignItems:"center",
  },
  view5:{
      width:SCREEN_WIDTH*0.70,
      height:40,
      justifyContent:"center",
      marginTop:10,
      borderWidth: 1,
      borderRadius: 5,
      
  },
  view6:{
    width:SCREEN_WIDTH*0.70,
    height:40,
    justifyContent:"center",
    marginTop:1,
    paddingLeft:0,
  },
  text1: {
    marginLeft:10,
    fontSize:13,
    color:colors.grey1
  },
  image1: {
    height:70,
    width:30,
    marginRight:10,
    marginTop:10
  },
  view7: {
    flexDirection:"row",
    alignItems:"center"
  },
  view8: {
    marginLeft:10
  },
  view10: {
      alignItems:"center",
      flex:5,
      flexDirection:"row",
      paddingVertical:10,
      borderBottomColor:colors.grey5,
      borderBottomWidth:1,
      paddingHorizontal:15
  },
  text10:{
    color:colors.grey2,
    paddingLeft:10
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: inputWidth / 2,
  },
  inputContainer: {
    width: inputWidth,
    height: inputWidth,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  input: {
    fontSize: 25,
    paddingHorizontal: 15,
  },
  submitIcon: {
    alignSelf: 'center',
    padding: 15,
    backgroundColor: colors.primary,
    borderRadius: 50,
    marginTop: 15,
  },
});