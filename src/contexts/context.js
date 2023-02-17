import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useReducer, useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { OriginReducer, DestinationReducer, PaymentReducer } from  '../reducers/reducer'
import Client from '../utils/api/client';
import { sendError } from '../utils/helper';

export const OriginContext = createContext();
export const DestinationContext = createContext();
export const PaymentContext = createContext();
export const AppContext = createContext({});



export const OriginContextProvider = (props)=>{
    const [ origin,dispatchOrigin ] = useReducer(OriginReducer,{
                latitude:null,
                longitude:null,
                address:"",
                name:""
    })
    return(
        <OriginContext.Provider value ={{ origin, dispatchOrigin }}>
            {props.children}
        </OriginContext.Provider>
    )
}


export const DestinationContextProvider = (props)=>{
    const [ destination, dispatchDestination ] = useReducer(DestinationReducer,{
                latitude:null,
                longitude:null,
                address:"",
                name:""
    })
    return(
        <DestinationContext.Provider value ={{ destination, dispatchDestination }}>
            {props.children}
        </DestinationContext.Provider>
    )
}

export const PaymentContextProvider = (props)=>{
    const [ payment, dispatchPayment ] = useReducer(PaymentReducer,{
                type: "Debit Card",
    })
    return(
        <PaymentContext.Provider value ={{ payment, dispatchPayment }}>
            {props.children}
        </PaymentContext.Provider>
    )
}


export const AppProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
          let info = await AsyncStorage.getItem('user');
          let token = await AsyncStorage.getItem('token');
          console.log('AuthToken is: ', token);
    
          if (token) {
            setToken(token);
            setUser(JSON.parse(info));
          }
          setIsLoading(false);
        } catch (error) {
          console.log('is logged in error');
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);


    const sendCode = async (phone) => {
        try {
            const {data} = await Client.post('/auth/send/code', {phone});
          return data;
        } catch (error) {
          return sendError(error);
        }
    };

    const VerifyPhone = async (phone, otp) => {
        try {
          const {data} = await Client.post('/auth/verify/phone', {phone, otp});
          console.log(data);
          return data;
        } catch (error) {
          return sendError(error);
        }
    };

    const login = async (phone, password) => {
        try {
            console.log(phone, password);
          const {data} = await Client.post('/auth/login', {phone, password});
          return data;
        } catch (error) {
          console.log(error)
          return sendError(error);
        }
    };

    const register = async values => {
        console.log(values)
        try {
        const {data} = await Client.post('/auth/register', {...values});
        return data;
        } catch (error) {
        return sendError(error);
        }
    };

    const signout = async () => {
        try {
            // setUser(null);
            setToken(null);
            // await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('token');
        } catch (error) {
            console.log(error)
            return false;
        }
    };
    
    const value = {
        isLoading,
        setIsLoading,
        user, 
        token,
        sendCode,
        VerifyPhone,
        register,
        signout,
        login,
        setUser,
        setToken
    };
    
      return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

const useApp = () => {
    const context = useContext(AppContext);
  
    if (context === undefined) {
      throw new Error('useApp must be used within AppContext');
    }
  
    return context;
  };
  
  export default useApp;

