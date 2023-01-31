import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeStack } from './StackNavigation';
import { BellIcon, ClockIcon, CreditCardIcon, ExclamationCircleIcon, HomeIcon, LockClosedIcon, QuestionMarkCircleIcon, TagIcon, UsersIcon } from 'react-native-heroicons/solid';
import { colors } from '../global/styles';
import CustomDrawer from '../components/CustomDrawer';
import NotificationScreen from '../screens/NotificationScreen';
import PaymentScreen from '../screens/PaymentScreen';
import RidesScreen from '../screens/RidesScreen';
import PromotionScreen from '../screens/PromotionScreen';
import InviteScreen from '../screens/InviteScreen';
import SupportScreen from '../screens/SupportScreen';
import PolicyScreen from '../screens/PolicyScreen';
import AboutScreen from '../screens/AboutScreen';

const Drawer = createDrawerNavigator();


export default function AppStack() {
    return (
        <Drawer.Navigator
            initialRouteName='HomeStack'
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: colors.primary,
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#000',
                drawerLabelStyle: {
                  marginLeft: -25,
                  fontSize: 15,
                },
              }}
        >
            <Drawer.Screen 
                name="HomeStack" 
                component={HomeStack} 
                options={{ 
                    title: "Home", 
                    drawerIcon: ({ focused, size }) => <HomeIcon size={size} fill={focused ? colors.grey : 'black'} />,
                    headerShown: false,
                }}
            />
            <Drawer.Screen 
                name="Notification" 
                component={NotificationScreen} 
                options={{ 
                    title: "Notification", 
                    drawerIcon: ({ focused, size }) => <BellIcon size={size} fill={focused ? colors.grey : 'black'} />,
                    headerShown: false,
                }}
            />

            <Drawer.Screen 
                name="Payment" 
                component={PaymentScreen} 
                options={{ 
                    title: "Payment", 
                    drawerIcon: ({ focused, size }) => <CreditCardIcon size={size} fill={focused ? colors.grey : 'black'} />,
                    headerShown: false,
                }}
            />

            <Drawer.Screen 
                name="Rides" 
                component={RidesScreen} 
                options={{ 
                    title: "Your Rides", 
                    drawerIcon: ({ focused, size }) => <ClockIcon size={size} fill={focused ? colors.grey : 'black'} />,
                    headerShown: false,
                }}
            />

            <Drawer.Screen 
                name="Promotion" 
                component={PromotionScreen} 
                options={{ 
                    title: "Promotions", 
                    drawerIcon: ({ focused, size }) => <TagIcon size={size} fill={focused ? colors.grey : 'black'} />,
                    headerShown: false,
                }}
            />

            <Drawer.Screen 
                name="Invite" 
                component={InviteScreen} 
                options={{ 
                    title: "Invite Friends", 
                    drawerIcon: ({ focused, size }) => <UsersIcon size={size} fill={focused ? colors.grey : 'black'} />,
                    headerShown: false,
                }}
            />

            <Drawer.Screen 
                name="Support" 
                component={SupportScreen} 
                options={{ 
                    title: "Support", 
                    drawerIcon: ({ focused, size }) => <QuestionMarkCircleIcon size={size} fill={focused ? colors.grey : 'black'} />,
                    headerShown: false,
                }}
            />

            <Drawer.Screen 
                name="policy" 
                component={PolicyScreen} 
                options={{ 
                    title: "Privacy Policy", 
                    drawerIcon: ({ focused, size }) => <LockClosedIcon size={size} fill={focused ? colors.grey : 'black'} />,
                    headerShown: false,
                }}
            />

            <Drawer.Screen 
                name="About" 
                component={AboutScreen} 
                options={{ 
                    title: "About", 
                    drawerIcon: ({ focused, size }) => <ExclamationCircleIcon size={size} fill={focused ? colors.grey : 'black'} />,
                    headerShown: false,
                }}
            />
        </Drawer.Navigator>
    );
}