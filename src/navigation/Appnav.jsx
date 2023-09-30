import React, { useContext, useState }  from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { AuthContext } from "../context/AuthContext";

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);
  const [updateCount, setUpdateCount] = useState(0);
  console.log("user", userToken);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default AppNav;