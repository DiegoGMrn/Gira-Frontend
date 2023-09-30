import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Componente from "./components/preview";
import HomeScreen from "./screens/Onboarding/Onboarding";
import { ThemeProvider } from "./components/ThemeProvider";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "./components/ThemeProvider";
import RegisterScreen from "./screens/Register/RegisterScreen";
import AuthStack from "./navigation/AuthStack";
import AppStack from "./navigation/AppStack";
import client from "./apollo";
import { ApolloProvider } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import AppNav from "./navigation/Appnav";



export default function App() {
  
 /*useEffect(() => {
    setUpdateCount(updateCount + 1);
  }, [userToken]);

  console.log("user", userToken);*/
  return (
    <ThemeProvider>
      <AuthProvider>
        <ApolloProvider client={client}>
            <AppNav />
        </ApolloProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
