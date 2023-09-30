import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Switch
} from "react-native";
import { useTheme } from "../../components/ThemeProvider";
import { NavigationProp } from "@react-navigation/native";
import styless from "../Styles";
import { StatusBar } from "expo-status-bar";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { AuthContext } from "../../context/AuthContext";

interface HomeProps {
  navigation: NavigationProp<any>; // Puedes ajustar el tipo según tu configuración
}

function Home({ navigation }: HomeProps) {
  const { dark, colors, setScheme } = useTheme();
  const { login, logout, isLoading, userToken } = useContext(AuthContext);
  const toggleTheme = () => {
    setScheme(dark ? "light" : "dark");
  };

  function logouthandle() {
    logout();
  }

  return (
    <View style={styless().container}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Switch value={dark} onValueChange={toggleTheme} />
        <Text style={[styles.highlight, { color: colors.text }]}>App.tsx</Text>
      </View>
      <View style={styless().buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            logouthandle();
          }}
          style={styless().button}
        >
          <Text style={styless().buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  highlight: {
    fontWeight: "700",
  },
});

export default Home;
