import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeStack } from './StackNavigation';
import { HomeIcon } from 'react-native-heroicons/solid';
import { colors } from '../global/styles';
import { AuthenticatedUserContext } from '../contexts/context';
import LoadingScreen from '../screens/LoadingScreen';
import AuthStack from './AuthStack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

const Drawer = createDrawerNavigator();


export default function DrawerNavigator() {

    const { user, setUser } = React.useContext(AuthenticatedUserContext);
    const [isLoading, setIsLoading] = React.useState(true);
    console.log(user);

    React.useEffect(() => {
        // onAuthStateChanged returns an unsubscriber
        const unsubscribeAuth = onAuthStateChanged( auth, async authenticatedUser => {
                authenticatedUser ? setUser(authenticatedUser) : setUser(null);
                setIsLoading(false);
            }
        );
    // unsubscribe auth listener on unmount
        return unsubscribeAuth;
    }, [user]);

    if (isLoading) {
        return (
            <LoadingScreen />
        );
    }

    return (
        <Drawer.Navigator>
            { user 
            ? 
                <Drawer.Screen 
                    name="HomeStack" 
                    component={HomeStack} 
                    options={{ 
                        title: "Home", 
                        drawerIcon: ({ focused, size }) => <HomeIcon size={size} fill={focused ? 'black' : colors.grey} />,
                        headerShown: false,
                    }}
                />
            :
                <Drawer.Screen 
                    name="AuthStack" 
                    component={AuthStack} 
                    options={{ 
                        title: "Auth", 
                        drawerIcon: ({ focused, size }) => <HomeIcon size={size} fill={focused ? 'black' : colors.grey} />,
                        headerShown: false,
                    }}
                />
            }
        </Drawer.Navigator>
    );
}