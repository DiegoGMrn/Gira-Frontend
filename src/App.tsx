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
import Toast, {BaseToast, ErrorToast} from "react-native-toast-message";

export default function App() {
  const { dark, colors, setScheme } = useTheme();

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{borderLeftColor: "green"}}
        contentContainerStyle={{backgroundColor: dark ? "#fff" : "#1f1f1f"}}
        text1Style={{color:  dark ? "#0ea5e9" : "#bc8afb", fontFamily: "Poppins_Bold"}}
        text2Style={{color:  dark ? "#000" : "#fff", fontFamily: "Poppins_Regular"}}

        />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        style={{borderLeftColor: "red"}}
        contentContainerStyle={{backgroundColor: dark ? "#fff" : "#1f1f1f"}}
        text1Style={{color:  dark ? "#0ea5e9" : "#bc8afb", fontFamily: "Poppins_Bold"}}
        text2Style={{color:  dark ? "#000" : "#fff", fontFamily: "Poppins_Regular"}}

        />
    ),
  };
  return (
    <ThemeProvider>
      <AuthProvider>
        <ApolloProvider client={client}>
          <AppNav />
          <Toast position="bottom" bottomOffset={30} config={toastConfig}/>
        </ApolloProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
