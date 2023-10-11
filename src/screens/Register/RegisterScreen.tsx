import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useTheme } from "../../components/ThemeProvider";
import { NavigationProp } from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import axios from "axios";
import { gql, useMutation } from "@apollo/client";
import styles from "../Styles";
import { AuthContext } from "../../context/AuthContext";
import { Formik } from "formik";
import * as Yup from "yup";
import { FormikHelpers } from "formik/dist/types";

interface RegisterProps {
  navigation: NavigationProp<any>; // Puedes ajustar el tipo según tu configuración
}

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Por favor ingrese su nombre completo."),
  email: Yup.string()
    .email("Correo invalido")
    .required("Por favor ingrese su correo")
    .nullable(),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .required("Por favor ingrese su contraseña.")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial."
    ),
  passwordConfirm: Yup.string()
    .min(8)
    .oneOf([Yup.ref("password"), ""], "Las contraseñas deben coincidir.")
    .required("Por favor confirme su contraseña.")
});

const RegisterScreen = ({ navigation }: RegisterProps) => {
  const { dark, colors, setScheme } = useTheme();
  const [nombre, onChangeNombre] = useState("");
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  //const [createCats, { data, loading, error }] = useMutation(register_m);
  const register_m = gql`
    mutation createUsers($userInput: CreateUserInput!) {
      createUsers(userInput: $userInput) {
        name
        clave
        correo
      }
    }
  `;

  const [signup] = useMutation(register_m, {
    variables: {
      userInput: {
        name: nombre,
        clave: password,
        correo: email,
      },
    },
    onCompleted: ({ signup }) => {
      navigation.goBack();
    },
  });

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        isValid,
        handleSubmit,
      }) => (
        <KeyboardAvoidingView style={styles().container}>
          <StatusBar style="light" />
          {/*<Image
        source={dark ? require("../../assets/BgAuthDark.png") : require("../../assets/BgAuthLight.png")}
        style={styles().background}
  />*/}
          {/* title and form */}
          <View style={styles().titleFormContainer}>
            {/* title */}
            <View style={styles().titleContainer}>
              <Text
                /*entering={FadeInUp.duration(1000).springify()}*/
                style={styles().titleText}
              >
                Registro
              </Text>
            </View>

            {/* form */}
            <View style={styles().formContainer}>
              <View
                /*entering={FadeInDown.duration(1000).springify()}*/
                style={styles().inputContainer}
              >
                <TextInput
                  placeholder="Nombre completo"
                  placeholderTextColor="gray"
                  value={values.name}
                  onChangeText={handleChange("name")}
                  onBlur={() => setFieldTouched("name")}
                />
              </View>

              {touched.name && errors.name && (
                <Text
                  style={{
                    color: "red",
                    textAlign: "auto",
                    fontSize: 12,
                    width: "100%",
                  }}
                >
                  {errors.name}
                </Text>
              )}

              <View
                /*entering={FadeInDown.duration(1000).springify()}*/
                style={styles().inputContainer}
              >
                <TextInput
                  placeholder="Correo"
                  placeholderTextColor="gray"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={() => setFieldTouched("email")}
                />
              </View>
              {touched.email && errors.email && (
                <Text
                  style={{
                    color: "red",
                    textAlign: "auto",
                    fontSize: 12,
                    width: "100%",
                  }}
                >
                  {errors.email}
                </Text>
              )}
              <View
                /*entering={FadeInDown.delay(200).duration(1000).springify()}*/
                style={styles().inputContainer}
              >
                <TextInput
                  placeholder="Contraseña"
                  placeholderTextColor="gray"
                  secureTextEntry
                  value={values.password}
                  autoCapitalize="none"
                  onChangeText={handleChange("password")}
                  onBlur={() => setFieldTouched("password")}
                />
              </View>
              {touched.password && errors.password && (
                <Text
                  style={{
                    color: "red",
                    textAlign: "auto",
                    fontSize: 12,
                    width: "100%",
                  }}
                >
                  {errors.password}
                </Text>
              )}
              <View
                /*entering={FadeInDown.delay(200).duration(1000).springify()}*/
                style={styles().inputContainer}
              >
                <TextInput
                  placeholder="Confirmar contraseña"
                  placeholderTextColor="gray"
                  secureTextEntry
                  value={values.passwordConfirm}
                  autoCapitalize="none"
                  onChangeText={handleChange("passwordConfirm")}
                  onBlur={() => setFieldTouched("passwordConfirm")}
                />
              </View>
              {touched.passwordConfirm && errors.passwordConfirm && (
                <Text
                  style={{
                    color: "red",
                    textAlign: "auto",
                    fontSize: 12,
                    width: "100%",
                  }}
                >
                  {errors.passwordConfirm}
                </Text>
              )}
              <TouchableOpacity style={styles().resetpwdContainer}>
                <Text style={styles().resetpwdText}></Text>
              </TouchableOpacity>
              <View style={styles().buttonContainer}>
                <TouchableOpacity
                  style={styles().button}
                  onPress={(e) => {
                    signup();
                  }}
                  disabled={!isValid}
                >
                  <Text style={styles().buttonText}>Registrarse</Text>
                </TouchableOpacity>
              </View>

              <View
                /*entering={FadeInDown.delay(400).duration(1000).springify()}*/
                style={styles().signUpContainer}
              >
                <Text style={styles().signUpText}>¿Ya tienes una cuenta? </Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={styles().signUpLink}>Inicia Sesión</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default RegisterScreen;
