import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';
import useApp from '../contexts/context';
import { colors } from '../global/styles';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ConfirmModal from './ConfirmModal';

const CustomDrawer = props => {
    const {user, signout, setUser, setToken} = useApp();
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [state, setState] = useState(false);
    

    const handleSignOut = () => setVisible(true);

    const confirm = (state) => {
      setState(state);
      if (state) {
        signout();
        setVisible(false);
        // setUser(null);
        setToken(null);
      }
    }
  
    return (
      <View style={{flex: 1}}>
        <ConfirmModal confirm={confirm} visible={visible} setVisible={setVisible} />
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{padding: 5}}>
          <View className="flex-row items-center justify-start space-x-3 px-5 py-3 border-b-4 border-[#FF6600]">
                <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                  <Image
                      source={require('../../assets/images/profile.png')}
                      style={{
                          height: 70,
                          width: 70,
                          borderRadius: 40,
                      }}
                  />
                </TouchableOpacity>
                <View>
                    <Text
                        style={{
                            fontSize: 15,
                            flexDirection: 'column',
                            fontWeight: 'bold'
                        }}>
                        {user?.name}
                    </Text>
                    
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => navigation.navigate('ProfileEditScreen')}>
                            <Text 
                                style={{
                                color: colors.primary,
                                }}>
                                Edit Profile
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
          </View>
          <View style={{flex: 1, backgroundColor: colors.white, paddingTop: 10}}>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>
  
        <View className="mx-5 my-5">
          <TouchableOpacity style={styles.button}>
            <View className="py-2">
              <Text className="font-semibold text-white">Become a Driver</Text>
              <Text className="font-semibold text-white">Earn money on your schedule</Text>
            </View>
          </TouchableOpacity>
  
          <TouchableOpacity
            onPress={handleSignOut}
            style={{paddingVertical: 15}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="exit-outline" size={22} />
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 7,
                }}>
                Log Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default CustomDrawer;

  const styles = StyleSheet.create({
    button:{
        height: 55,
        borderRadius: 15,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: colors.primary
    }
  })