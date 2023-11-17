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
import { AuthContext } from "../context/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home/Home";
import Teams from "../screens/Teams/Teams";
import ProfileScreen from "../screens/Profile/Profile";
import SettingsScreen from "../screens/Settings/Settings";
import ChangepwdAppScreen from "../screens/Settings/ChangepwdApp";
import TeamDetailScreen from "../screens/Teams/TeamDetail";
import Proyect from "../screens/Proyects/Proyects";
import ProyectDetail from "../screens/Proyects/ProyectDetail";
import TeamsProject from "../screens/Proyects/ProyectTeams";
import EditTeamProyect from "../screens/Proyects/EditTeamProyect";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Shadow } from "react-native-shadow-2";
import { NavigationProp } from "@react-navigation/native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const BottomTab = createBottomTabNavigator();

function CustomTabBar({ navigation }: BottomTabBarProps) {

  const { dark, colors, setScheme } = useTheme();
  

  return (
    <View style={styles.menuWrapper}>
      <Shadow distance={3} style={{ alignSelf: "stretch" }}>
        <View
          style={[styles.menuContainer, { backgroundColor: colors.background }]}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Ionicons name="home" size={30} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Proyects")}>
            <Ionicons name="folder" size={30} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Teams")}>
            <Ionicons name="people" size={30} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Ionicons name="person-circle" size={30} color={colors.text} />
          </TouchableOpacity>
        </View>
      </Shadow>
    </View>
  );
}

const BottomStack = () => {
  const { dark, colors, setScheme } = useTheme();
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { color: colors.text },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <BottomTab.Screen name="Home" component={Home} options={{}} />
      <BottomTab.Screen name="Proyects" component={Proyect} />
      <BottomTab.Screen name="ProyectDetail" component={ProyectDetail} />
      <BottomTab.Screen name="TeamsProject" component={TeamsProject} />
      <BottomTab.Screen name="EditTeamProyect" component={EditTeamProyect} />
      <BottomTab.Screen name="Teams" component={Teams} />
      <BottomTab.Screen name="TeamDetail" component={TeamDetailScreen} />
      <BottomTab.Screen name="Profile" component={ProfileScreen} />
      <BottomTab.Screen name="Settings" component={SettingsScreen} />
      <BottomTab.Screen name="ChangepwdApp" component={ChangepwdAppScreen} />
    </BottomTab.Navigator>
  );
};

function AppStack() {
  const { dark, colors, setScheme } = useTheme();

  return (
  
    <Stack.Navigator initialRouteName="BottomStack">
      <Stack.Screen
        name="BottomStack"
        component={BottomStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}



const styles = StyleSheet.create({
  menuWrapper: {
    position: "absolute",
    marginTop: 20,

    bottom: 0,
    left: 5,
    right: 5,
  },
  menuWrapper2: {
    position: "absolute",
    bottom: 0,
    left: 5,
    right: 5,
  },
  menuContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 70,
    paddingHorizontal: 25,
    marginTop: 0,
    borderRadius: 32,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },
  plusBtnContainer: {
    backgroundColor: "white",
    height: 60,
    width: 60,
    borderRadius: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AppStack;
