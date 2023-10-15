import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Onboarding from '../screens/Onboarding/Onboarding';
import RegisterScreen from '../screens/Register/RegisterScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import Resetpwd from '../screens/Resetpwd/Resetpwd';
import Validationcode from '../screens/Resetpwd/Validationcode';
import ChangePasswordScreen from '../screens/Resetpwd/Changepwd';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Onboarding" component={Onboarding} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Resetpwd" component={Resetpwd} />
                <Stack.Screen name="Validationcode" component={Validationcode} />
                <Stack.Screen name="Changepassword" component={ChangePasswordScreen} />
            </Stack.Navigator>

    )
};

export default AuthStack;