import React, { useEffect, useRef, useState } from 'react'
import {
    View,
    StyleSheet,
    Button,
    Modal,
    Image,
    Text,
    TouchableOpacity,
    Animated,
} from 'react-native';

const ModalPoup = ({visible, children}) => {
    const [showModal, setShowModal] = useState(visible);
    const scaleValue = useRef(new Animated.Value(0)).current;
    useEffect(() => {
      toggleModal();
    }, [visible]);

    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        setTimeout(() => setShowModal(false), 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
    }
};

    return (
        <Modal transparent visible={showModal}>
        <View style={styles.modalBackGround}>
            <Animated.View
            style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
            {children}
            </Animated.View>
        </View>
        </Modal>
    );
}

const ModalCancelTrip = ({ visible, setVisible, setState }) => {

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ModalPoup visible={visible}>
            <View className="mx-6 my-3 p-2">
              <Text className="text-lg font-medium text-center">
                Cancel ride with Matthew
              </Text>
              <Text className="text-center mt-1">You might have to wait longer if you cancel</Text>
            </View>

            <View className="flex-col space-y-2">
              <TouchableOpacity onPress={() => setState(true)}>
                  <View className="bg-[#D70916] p-4 rounded-3xl mx-2">
                    <Text className="text-center text-white text-lg font-medium">Confirm</Text>
                  </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setVisible(false)}>
                  <View className="bg-[#D0D0D0] p-4 rounded-3xl mx-2">
                    <Text className="text-center text-white text-lg font-medium">Back</Text>
                  </View>
              </TouchableOpacity>
            </View>
        </ModalPoup>
        <Button title="Open Modal" onPress={() => setVisible(true)} />
    </View>
  )
}

export default ModalCancelTrip

const styles = StyleSheet.create({
    modalBackGround: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: '80%',
      backgroundColor: 'white',
      paddingHorizontal: 20,
      paddingVertical: 30,
      borderRadius: 20,
      elevation: 20,
    },
    header: {
      width: '100%',
      height: 40,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
});
  