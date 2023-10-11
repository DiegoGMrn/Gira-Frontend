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
import { useMutation, gql } from "@apollo/client";

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
    mutation resetPassword($resetPasswordInput: resetPasswordInput!) {
      resetPassword(resetPasswordInput: $resetPasswordInput)
    }
  `;
  const [changePassword] = useMutation(login_m, {
    variables: {
      resetPasswordInput: {
        correo: email,
        contraseña: password,
        nuevaContraseña: newpassword,
      },
    },
    onCompleted: (data) => {
      const response = data.resetPasswordInput;
      console.log(response);
      if (response != "") {
        console.log("Se completo");
      } else {
        alert("Correo o contraseña inválidos");
        //setLoginError("Correo o contraseña inválidos");
      }
    },
  });

  return (
    <View style={styless().container}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Switch value={dark} onValueChange={toggleTheme} />
        <Text style={[styles.highlight, { color: colors.text }]}>App.tsx</Text>
      </View>
      {/**/}
      <View style={styless().titleFormContainer}>
        <View style={styless().formContainer}>
          <View style={styless().inputContainer}>
            <TextInput
              style={styless().input}
              placeholder="Correo"
              placeholderTextColor={"gray"}
              value={email}
              onChangeText={(text) => onChangeEmail(text)}
            />
          </View>
          <View style={styless().inputContainer}>
            <TextInput
              style={styless().input}
              placeholder="Contraseña"
              placeholderTextColor="gray"
              secureTextEntry
              value={password}
              onChangeText={(text) => onChangePassword(text)}
            />
          </View>
          <View style={[styless().inputContainer, {marginBottom: 10,}]}>
            <TextInput
              style={styless().input}
              placeholder="Nueva contraseña"
              placeholderTextColor="gray"
              secureTextEntry
              value={newpassword}
              onChangeText={(text) => onChangeNewPassword(text)}
            />
          </View>
          <View style={styless().signUpContainer}>
            <View style={styless().buttonContainer}>
              <TouchableOpacity onPress={(e) => {changePassword()}} style={styless().button}>
                <Text style={styless().buttonText}>Cambiar contraseña</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styless().signUpContainer}>
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
