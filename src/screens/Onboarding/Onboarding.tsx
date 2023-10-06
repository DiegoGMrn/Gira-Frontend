import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTheme } from "../../components/ThemeProvider";
import { NavigationProp } from "@react-navigation/native";
import styles from "../Styles";
import { StatusBar } from "expo-status-bar";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { AuthContext } from "../../context/AuthContext";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { useState } from "react";

interface HomeProps {
  navigation: NavigationProp<any>; // Puedes ajustar el tipo según tu configuración
}

function Onboarding({ navigation }: HomeProps) {
  const { dark, colors, setScheme } = useTheme();
  const {login, logout, isLoading, userToken} = useContext(AuthContext);
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  const login_m = gql`
    mutation loginUsers($loginInput: LoginUserInput!) {
      loginUsers(loginInput: $loginInput)
    }
  `;

  const [login2] = useMutation(login_m, {
    variables: {
      loginInput: {
        clave: password,
        correo: email,
      },
    },
    onCompleted: ({ login2 }) => {
      navigation.navigate("Onboarding");
      console.log("Se completo");
      login();
    },
  });

  /*const handleLogin = () => {
    login();
  };*/
  return (
    /*<View style={styles().container}>
      <View style={styles().illustrationWrapper}>
        <Image source={require('../../assets/HomeScreenillust.png')} style={styles().illustrationContent} />
      </View>
      <Text style={styles().largeText}>Gestión de {'\n'}Tareas</Text>
      <Text style={styles().smallText}>
        Bienvenido a la aplicación de gestión de tareas. {'\n'}Para continuar, inicia sesión o registrate.
      </Text>
      <TouchableOpacity
        style={styles().loginBtnWrapper}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles().loginBtnText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles().signUpBtnWrapper}
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles().signUpBtnText}>Registrarse</Text>
      </TouchableOpacity>
    </View>*/
    <KeyboardAvoidingView
      style={styles().container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Solo establece 'padding' en iOS
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -150} // Ajusta el valor según tus necesidades
      enabled={Platform.OS === "ios"} // Habilita solo en iOS
    >
      <StatusBar style="light" />
      <Image
        source={
          dark
            ? require("../../assets/BgAuthDark.png")
            : require("../../assets/BgAuthLight.png")
        }
        style={styles().background}
      />
      {/* title and form */}
      <View style={styles().titleFormContainer}>
        {/* title */}
        <View style={styles().titleContainer}>
          <Text
            /*entering={FadeInUp.duration(1000).springify()}*/
            style={styles().titleText}
          >
            GIRA
          </Text>
        </View>

        {/* form */}
        <View style={styles().formContainer}>
          <View
            /*entering={FadeInDown.duration(1000).springify()}*/
            style={styles().inputContainer}
          >
            <TextInput
              style={styles().input}
              placeholder="Correo"
              placeholderTextColor={"gray"}
              value={email}
              onChangeText={(text) => onChangeEmail(text)}
            />
          </View>
          <View
            /*entering={FadeInDown.delay(200).duration(1000).springify()}*/
            style={styles().inputContainer}
          >
            <TextInput
              style={styles().input}
              placeholder="Contraseña"
              placeholderTextColor="gray"
              secureTextEntry
              value={password}
              onChangeText={(text) => onChangePassword(text)}
            />
          </View>
          <TouchableOpacity style={styles().resetpwdContainer}>
            <Text
              style={styles().resetpwdText}
              onPress={() => navigation.navigate("Resetpwd")}
            >
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>

          <View style={styles().buttonContainer}>
            <TouchableOpacity onPress={(e) => {login2()}} style={styles().button}>
              <Text style={styles().buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
          </View>

          <View
            /*entering={FadeInDown.delay(400).duration(1000).springify()}*/
            style={styles().signUpContainer}
          >
            <Text style={styles().signUpText}>¿No tienes una cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles().signUpLink}>Registrate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

/*const stylesss = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  statusBar: {
    backgroundColor: "transparent", // Ajusta el color de la barra de estado según tus necesidades
  },
  background: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  titleFormContainer: {
    flex: 1,
    justifyContent: "space-around",
    paddingTop: 140,
    paddingBottom: 40,
  },
  titleContainer: {
    alignItems: "center",
  },
  titleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 48,
  },
  formContainer: {
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 16,
  },
  inputContainer: {
    backgroundColor: "rgba(0,0,0,0.05)", // Ajusta el color de fondo según tus necesidades
    padding: 10,
    borderRadius: 16,
    width: "100%",
    marginBottom: 10,
  },
  input: {
    color: "black",
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    backgroundColor: "#0ea5e9", // Cambia esto al color deseado
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signUpText: {
    color: "black",
  },
  signUpLink: {
    color: "#00BFFF", // Cambia esto al color deseado
    fontWeight: "bold",
  },
  resetpwdContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  resetpwdText: {
    color: "black",
    textAlign: "right",
  },
});*/

export default Onboarding;
