import React, { useContext, useState }  from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { AuthContext } from "../context/AuthContext";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);
  const [updateCount, setUpdateCount] = useState(0);
  
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
    <NavigationContainer>
      {userToken == "" ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
}

export default AppNav;
