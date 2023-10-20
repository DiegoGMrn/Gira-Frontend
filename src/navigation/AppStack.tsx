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
//import styles from "../screens/Styles";
import { AuthContext } from "../context/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home/Home";
import Teams from "../screens/Teams/Teams";
import ProfileScreen from "../screens/Profile/Profile";
import SettingsScreen from "../screens/Settings/Settings";
import ChangepwdAppScreen from "../screens/Settings/ChangepwdApp";
import TeamDetailScreen from "../screens/Teams/TeamDetail";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Shadow } from "react-native-shadow-2";
import { NavigationProp } from "@react-navigation/native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const BottomTab = createBottomTabNavigator();

function CustomTabBar({ navigation }: BottomTabBarProps) {
  /*const {state, dispatch} = useContext(AuthContext);
  const [data, setData] = useState({activeNavTab: 'Dashboard'});*/
  const { dark, colors, setScheme } = useTheme();
  /*const handleNavigation = route => {
    setData(combineData(data, {activeNavTab: route}));
    props?.navigation.navigate(route);
  };*/

  /*const getColor = title => {
    let color;
    if (title === data?.activeNavTab) {
      color = appTheme.PRIMARY_COLOR;
    } else {
      color = appTheme.INACTIVE_COLOR;
    }
    return color;
  };*/

  /*const handleBottomModal = bottomModal => {
    dispatch({
      type: 'toggleBottomModal',
      payload: {bottomModal},
    });
  };*/

  return (
    <View style={styles.menuWrapper}>
      <Shadow distance={3} style={{ alignSelf: "stretch" }}>
        <View
          style={[styles.menuContainer, { backgroundColor: colors.background }]}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Ionicons name="home" size={30} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Teams")}>
            <Ionicons name="people" size={30} color={colors.text} />
          </TouchableOpacity>
          {/*<TouchableOpacity
          style={styles.plusBtnContainer}
          >
          <MaterialCommunityIcons name="plus" size={25} color="#fff" />
  </TouchableOpacity>*
        <TouchableOpacity >
          <Feather name="send" size={25} color={"white"} />
  </TouchableOpacity>*/}
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
    /*<Tab.Navigator
      screenOptions={({
        tabBarLabelStyle: { color: colors.text },
        tabBarStyle: { backgroundColor: colors.primary, borderTopStartRadius: 20, borderTopEndRadius: 20 },
        headerStyle: { backgroundColor: colors.primary },
        headerTitleStyle: { color: colors.text },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>*/
    <Stack.Navigator initialRouteName="BottomStack">
      <Stack.Screen
        name="BottomStack"
        component={BottomStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="H" component={Home} />
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
