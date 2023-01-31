import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Alert, Linking, Platform } from 'react-native';

export const useNotifications = () => {
    const registerForPushNotificationsAsync = async () => {
        let token;
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log("Token ", token);
        } else {
          Alert.alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {  
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
    }

    const handleNotification = (notification) => {

    };

    const handleNotificationResponse = (response) => {
        const data = response.notification.request.content.data;

        if(data?.url) Linking.openURL(data.url);
    }

    return  { registerForPushNotificationsAsync, handleNotification, handleNotificationResponse }
}