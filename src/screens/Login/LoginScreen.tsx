/*import React, { useContext, useState } from "react";
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
    mutation loginUsersTest($loginInput: LoginUserInput!) {
      loginUsersTest(loginInput: $loginInput)
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
      const token = data.loginUsersTest;
      console.log(token);
      if (token != "") {
        console.log("Se completo");
        login(token);
      } else {
        setLoginError("Correo o contraseña inválidos.");
      }
    },
  });

  const { login } = useContext(AuthContext);

  return (
    <KeyboardAvoidingView
      style={styles().container}
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
      {/* title and form }/*
      <View style={styles().titleFormContainer}>
        {/* title }/*
        <View style={styles().titleContainer}>
          <Text style={styles().titleText}>GIRA</Text>
        </View>

        {/* form }/*
        <View style={styles().formContainer}>
        {loginError ? (
            <Text
              style={{
                color: "red",
                textAlign: "center",
                fontSize: 15,
                width: "100%",
                paddingBottom: 0,
              }}
            >
              {loginError}
            </Text>
          ) : null}
        
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
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles().signUpLink}>Registrate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Onboarding;*/
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import Separator from "../../components/Separator";
import ToggleButton from "../../components/ToggleButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Display from "../../utils/Display";
import LottieView from "lottie-react-native";
import { NavigationProp } from "@react-navigation/native";
import { useTheme } from "../../components/ThemeProvider";
import { AuthContext } from "../../context/AuthContext";
import { useMutation, gql } from "@apollo/client";
import Toast from "react-native-toast-message";
interface SigninProps {
  navigation: NavigationProp<any>; // Puedes ajustar el tipo según tu configuración
}

const SigninScreen = ({ navigation }: SigninProps) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [email, onChangeEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading2, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { dark, colors, setScheme } = useTheme();
  const { login, isLoading, userToken } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");

  const login_m = gql`
    mutation loginUsersTest($loginInput: LoginUserInput!) {
      loginUsersTest(loginInput: $loginInput)
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
      const token = data.loginUsersTest;
      console.log(token);
      if (token != "") {
        console.log("Se completo");
        login(token);
      } else {
        setLoginError("Correo o contraseña inválidos.");
      }
    },
  });


  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background2 }]}
    >
      <StatusBar
        barStyle={dark ? "light-content" : "dark-content"}
        backgroundColor={colors.background2}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          color={colors.tint}
          onPress={() => navigation.goBack()}
        />
        <Text style={[styles.headerTitle, { color: colors.tint }]}>
          Iniciar Sesión
        </Text>
      </View>
      <Text style={[styles.title, { color: colors.text }]}>Bienvenido</Text>
      <Text style={[styles.content, { color: colors.text }]}>
        Ingresa tu correo y contraseña para iniciar sesión
      </Text>
      <View
        style={[styles.inputContainer, { backgroundColor: colors.bgInput }]}
      >
        <View style={styles.inputSubContainer}>
          <Feather
            name="user"
            size={22}
            color={"grey"}
            style={{ marginRight: 10 }}
          />
          <TextInput
            placeholder="Correo"
            placeholderTextColor={"grey"}
            selectionColor={"grey"}
            style={[styles.inputText, { color: colors.text }]}
            onChangeText={(text) => onChangeEmail(text)}
          />
        </View>
      </View>
      <Separator height={15} />
      <View
        style={[styles.inputContainer, { backgroundColor: colors.bgInput }]}
      >
        <View style={styles.inputSubContainer}>
          <Feather
            name="lock"
            size={22}
            color={"grey"}
            style={{ marginRight: 10 }}
          />
          <TextInput
            secureTextEntry={isPasswordShow ? false : true}
            placeholder="Contraseña"
            placeholderTextColor={"grey"}
            selectionColor={"grey"}
            style={[styles.inputText, { color: colors.text }]}
            onChangeText={(text) => setPassword(text)}
          />
          <Feather
            name={isPasswordShow ? "eye" : "eye-off"}
            size={22}
            color={"grey"}
            style={{ marginRight: 10 }}
            onPress={() => setIsPasswordShow(!isPasswordShow)}
          />
        </View>
      </View>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <View style={styles.forgotPasswordContainer}>
        <Text
          style={[styles.forgotPasswordText, { color: colors.tint }]}
          onPress={() => navigation.navigate("Resetpwd")}
        >
          ¿Olvidaste tu contraseña?
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.signinButton, { backgroundColor: colors.tint }]}
        onPress={(e) => {
          login2();
        }}
        activeOpacity={0.8}
        
      >
        {isLoading2 ? (
          <LottieView source={require("../../assets/loading.json")} autoPlay />
        ) : (
          <Text style={styles.signinButtonText}>Iniciar Sesión</Text>
        )}
      </TouchableOpacity>
      <View style={styles.signupContainer}>
        <Text style={[styles.accountText, { color: colors.text }]}>
          ¿No tienes una cuenta?
        </Text>
        <Text
          style={[styles.signupText, { color: colors.tint }]}
          onPress={() => navigation.navigate("Register")}
        >
          Registrate
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Poppins_Medium",
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins_Medium",
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  content: {
    fontSize: 18,
    fontFamily: "Poppins_Medium",
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  inputContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
  },
  inputSubContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: "center",
    padding: 0,
    height: Display.setHeight(6),
    color: "black",
    flex: 1,
  },
  forgotPasswordContainer: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rememberMeText: {
    marginLeft: 10,
    fontSize: 12,
    lineHeight: 12 * 1.4,
    color: "grey",
    fontFamily: "Poppins_Medium",
  },
  forgotPasswordText: {
    fontSize: 12,
    lineHeight: 12 * 1.4,
    color: "green",
    fontFamily: "Poppins_Bold",
  },
  signinButton: {
    backgroundColor: "green",
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: "white",
    fontFamily: "Poppins_Medium",
  },
  signupContainer: {
    marginHorizontal: 20,
    justifyContent: "center",
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  accountText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    color: "black",
    fontFamily: "Poppins_Medium",
  },
  signupText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    color: "green",
    fontFamily: "Poppins_Medium",
    marginLeft: 5,
  },
  signinButtonLogo: {
    height: 18,
    width: 18,
  },
  signinButtonLogoContainer: {
    backgroundColor: "white",
    padding: 2,
    borderRadius: 3,
    position: "absolute",
    left: 25,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  socialSigninButtonText: {
    color: "white",
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: "Poppins_Medium",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  errorMessage: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    color: "red",
    fontFamily: "Poppins_Medium",
    marginHorizontal: 20,
    marginTop: 3,
    marginBottom: 10,
  },
});

export default SigninScreen;
