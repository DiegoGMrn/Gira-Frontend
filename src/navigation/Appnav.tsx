import React, { useContext, useState, useCallback }  from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { AuthContext } from "../context/AuthContext";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);
  const [updateCount, setUpdateCount] = useState(0);
  const [fontsLoaded] = useFonts({
    Poppins_Regular: require("../assets/fonts/Poppins-Regular.ttf"),
    Poppins_Black: require("../assets/fonts/Poppins-Black.ttf"),
    Poppins_Medium: require("../assets/fonts/Poppins-Medium.ttf"),
    Poppins_Bold: require("../assets/fonts/Poppins-Bold.ttf"),
    Poppins_Light: require("../assets/fonts/Poppins-Light.ttf"),
  });
  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) return null;
  console.log("user", userToken);
  console.log("comparacion",userToken == "" ? "true" : "false");
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer onLayout={onLayout}>
      {userToken == "" ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
}

export default AppNav;
