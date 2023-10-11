import React, { useContext, useState  } from "react";
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
import { AuthContext } from "../../context/AuthContext";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

interface HomeProps {
  navigation: NavigationProp<any>; // Puedes ajustar el tipo según tu configuración
}

const Onboarding = ({ navigation }: HomeProps) => {
  const { dark, colors, setScheme } = useTheme();
  const { isLoading, userToken } = useContext(AuthContext);
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [loginError, setLoginError] = useState("");

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
    onCompleted: (data) => {
      const token = data.loginUsers;
      console.log(token);
      if (token != "") {
        console.log("Se completo");
        login(token);
      } else {
        alert("Correo o contraseña inválidos");
        //setLoginError("Correo o contraseña inválidos");
      }
    },
  });

  const { login } = useContext(AuthContext);

  return (
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
          <Text style={styles().titleText}>GIRA</Text>
        </View>

        {/* form */}
        <View style={styles().formContainer}>
          <View style={styles().inputContainer}>
            <TextInput
              style={styles().input}
              placeholder="Correo"
              placeholderTextColor={"gray"}
              value={email}
              onChangeText={(text) => onChangeEmail(text)}
            />
          </View>
          <View style={styles().inputContainer}>
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

          {loginError ? (
            <Text style={styles().errorText}>{loginError}</Text>
          ) : null}

          <View style={styles().buttonContainer}>
            <TouchableOpacity
              onPress={(e) => {
                login2();
              }}
              style={styles().button}
            >
              <Text style={styles().buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
          </View>

          <View style={styles().signUpContainer}>
            <Text style={styles().signUpText}>¿No tienes una cuenta? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={styles().signUpLink}>Registrate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Onboarding;