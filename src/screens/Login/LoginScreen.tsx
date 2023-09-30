import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTheme } from "../../components/ThemeProvider";
import { NavigationProp } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";

interface LoginProps {
  navigation: NavigationProp<any>; // Puedes ajustar el tipo según tu configuración
}

function LoginScreen({ navigation }: LoginProps) {
  const { dark, colors, setScheme } = useTheme();

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
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Solo establece 'padding' en iOS
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -150} // Ajusta el valor según tus necesidades
      enabled={Platform.OS === "ios"} // Habilita solo en iOS
    >
      <StatusBar style="light" />
      <Image
        source={require("../../assets/BgAuthLight.png")}
        style={styles.background}
      />
      {/* title and form */}
      <View style={styles.titleFormContainer}>
        {/* title */}
        <View style={styles.titleContainer}>
          <Text
            /*entering={FadeInUp.duration(1000).springify()}*/
            style={styles.titleText}
          >
            Login
          </Text>
        </View>

        {/* form */}
        <View style={styles.formContainer}>
          <View
            /*entering={FadeInDown.duration(1000).springify()}*/
            style={styles.inputContainer}
          >
            <TextInput placeholder="Email" placeholderTextColor={"black"} />
          </View>
          <View
            /*entering={FadeInDown.delay(200).duration(1000).springify()}*/
            style={styles.inputContainer}
          >
            <TextInput
              placeholder="Password"
              placeholderTextColor={"black"}
              secureTextEntry
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              /*onPress={() => navigation.navigate("SignUp")}*/
              style={styles.button}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View
            /*entering={FadeInDown.delay(400).duration(1000).springify()}*/
            style={styles.signUpContainer}
          >
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.signUpLink}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
    paddingTop: 160,
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
    backgroundColor: "black", // Ajusta el color de fondo según tus necesidades
    opacity: 0.05,
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
});

export default LoginScreen;
