import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Switch,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../components/ThemeProvider";
import styles from "../screens/Styles";
import { AuthContext } from "../context/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppStack = () => {
  const { dark, colors, setScheme } = useTheme();

  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarStyle: { backgroundColor: colors.primary },
      headerStyle: {backgroundColor: colors.primary, },
      headerTitleStyle: {color: colors.text},
    })}

      
    >
        <Tab.Screen name="Home" component={HomeStackScreen} />
    </Tab.Navigator>
  );
};

function HomeStackScreen(){
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="H" component={Home} />
    </Stack.Navigator>
  )
}

export default AppStack;
