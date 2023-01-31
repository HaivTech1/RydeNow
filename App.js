import 'react-native-gesture-handler';
import React from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import RoootNavigator from './src/navigation/RootNavigator';
import { AppProvider, DestinationContextProvider, OriginContextProvider, PaymentContextProvider } from './src/contexts/context';
import { useEffect } from 'react';
import NoInternet from './src/components/NoInternet';
import { useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useNotifications } from './src/utils/useNotifications';

export default function App() {

  const {registerForPushNotificationsAsync, handleNotificationResponse} = useNotifications();

  const requestUserPermission = async() => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  // useEffect(() => {
  //     if(requestUserPermission()){
  //       //return fcm token for the device
  //       messaging().getToken().then(token => {
  //         console.log(token);
  //       });
  //     }else{
  //       console.log('Failed token status', authStatus);
  //     }

  //     messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //       }
  //     });

  //     messaging().onNotificationOpenedApp(remoteMessage => {
  //       console.log(
  //         'Notification caused app to open from background state:',
  //         remoteMessage.notification,
  //       );
  //     });

  //     messaging().setBackgroundMessageHandler(async remoteMessage => {
  //       console.log('Message handled in the background!', remoteMessage);
  //     });

  //     const unsubscribe = messaging().onMessage(async remoteMessage => {
  //       Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //     });
  
  //     return unsubscribe;
  // }, []);

  useEffect(() => {
    registerForPushNotificationsAsync();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      })
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);
    return () => {
      if(responseListener)
        Notifications.removeNotificationSubscription(responseListener);
    }
  }, [])
  

  const [nointernet, setNointernet] = useState(false);
  const netInfo = useNetInfo();

  const fetchNetInfo = () => {
    const {isConnected, isInternetReachable} = netInfo;

    if (isConnected === false && isInternetReachable === false) setNointernet(true);
    else setNointernet(false);
  };

  useEffect(() => {
    fetchNetInfo();
  }, [netInfo]);

  if (nointernet) return <NoInternet onRefreshPress={fetchNetInfo} />;

  return (
    <AppProvider>
        <DestinationContextProvider>
          <OriginContextProvider>
            <PaymentContextProvider>
              <RoootNavigator />
            </PaymentContextProvider>
          </OriginContextProvider>
        </DestinationContextProvider>
    </AppProvider>
  );
}
