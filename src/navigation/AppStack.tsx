import React, {useContext} from "react";
import { View, Text, StyleSheet, useColorScheme, Switch, TouchableOpacity } from "react-native";
import { useTheme } from "../components/ThemeProvider";
import styless from "../screens/Styles";
import { AuthContext } from "../context/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home/Home";

const Stack = createNativeStackNavigator();


const AppStack = () => {
  const { dark, colors, setScheme } = useTheme();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Onboarding" component={Home} />

            
        </Stack.Navigator>
  );
};


export default AppStack;
