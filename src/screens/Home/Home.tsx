import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Switch,
  StatusBar,
} from "react-native";
import { useTheme } from "../../components/ThemeProvider";
import { NavigationProp } from "@react-navigation/native";
import styless from "../Styles";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { AuthContext } from "../../context/AuthContext";
import { useMutation, gql } from "@apollo/client";
import Ionicons from "react-native-vector-icons/Ionicons";

interface HomeProps {
  navigation: NavigationProp<any>; // Puedes ajustar el tipo según tu configuración
}

function Home({ navigation }: HomeProps) {
  const { dark, colors, setScheme } = useTheme();
  const { login, logout, isLoading, userToken } = useContext(AuthContext);
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [newpassword, onChangeNewPassword] = useState("");
  const toggleTheme = () => {
    setScheme(dark ? "light" : "dark");
  };

  function logouthandle() {
    logout();
  }
  const login_m = gql`
    mutation resetPassword($resetPasswordInput: UpdatePasswordInput!) {
      resetPassword(resetPasswordInput: $resetPasswordInput)
    }
  `;
  const [changePassword] = useMutation(login_m, {
    variables: {
      resetPasswordInput: {
        claveAntigua: password,
        claveNueva: newpassword,
      },
    },
    onCompleted: (data) => {
      const response = data.resetPassword;
      console.log(response);
      if (response != "") {
        console.log("Se completo");
      } else {
        alert("No se pudo cambiar la contraseña");
        //setLoginError("Correo o contraseña inválidos");
      }
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.background2 }}>
      <StatusBar
        barStyle={dark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
        translucent
      />
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 13,
          paddingHorizontal: 16,
          marginTop: 14,
          marginBottom: 16,
          backgroundColor: colors.background,
        }}
      >
        <TouchableOpacity onPress={() => (logout())}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: colors.text }}>
          Inicio
        </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ paddingLeft: 12 }}>
            <Ionicons name="search" size={30} color={colors.text} />
          </TouchableOpacity>
        </View>
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
