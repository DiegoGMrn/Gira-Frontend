import React, { useState } from "react";
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
import { useTheme } from "../../components/ThemeProvider";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Separator from "../../components/Separator";
import Display from "../../utils/Display";
import Feather from "react-native-vector-icons/Feather";
import LottieView from "lottie-react-native";
import { NavigationProp } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import { FormikHelpers } from "formik/dist/types";
import { gql, useMutation } from "@apollo/client";
import Toast  from "react-native-toast-message";
interface SignupScreenProps {
  navigation: NavigationProp<any>; 
}

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Por favor ingrese su nombre completo."),
  email: Yup.string()
    .email("Correo invalido")
    .required("Por favor ingrese su correo.")
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
    .required("Por favor confirme su contraseña."),
});

const SignupScreen = ({ navigation }: SignupScreenProps) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dark, colors, setScheme } = useTheme();

  const showToastSuccess = () => {
    Toast.show({
      type: "success",
      text1: "Usuario registrado.",
      text2: "Se ha registrado exitosamente.",
    });
  }

  const showToastError = () => {
    Toast.show({
      type: "error",
      text1: "Usuario no registrado.",
      text2: "El correo ya está registrado.",
    });
  }

  const register_m = gql`
    mutation createUsers($userInput: CreateUserInput!) {
      createUsers(userInput: $userInput)
    }
  `;

  const [signup] = useMutation(register_m, {
    onCompleted: ( data ) => {
      console.log(data);
      const response = data.createUsers;
      console.log(response);
      if (response == true) {
        showToastSuccess();
        navigation.goBack();
      }
      else {
        showToastError();
        setErrorMessage("El correo ya está registrado.");
      }
      
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
        dirty,
      }) => (
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
              Registrarse
            </Text>
          </View>
          <Text style={[styles.title, { color: colors.text }]}>
            Crear Cuenta
          </Text>
          <Text style={[styles.content, { color: colors.text }]}>
            Ingresa tu nombre, correo y contraseña
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
                placeholder="Nombre completo"
                placeholderTextColor={"grey"}
                selectionColor={"grey"}
                value={values.name}
                style={[styles.inputText, { color: colors.text }]}
                onChangeText={handleChange("name")}
                onBlur={() => setFieldTouched("name")}
              />
            </View>
          </View>
          {touched.name && errors.name && (
            <Text style={styles.errorMessage}>{errors.name}</Text>
          )}

          <View
            style={[styles.inputContainer, { backgroundColor: colors.bgInput }]}
          >
            <View style={styles.inputSubContainer}>
              <Feather
                name="mail"
                size={22}
                color={"grey"}
                style={{ marginRight: 10 }}
              />
              <TextInput
                placeholder="Correo"
                placeholderTextColor={"grey"}
                selectionColor={"grey"}
                value={values.email}
                style={[styles.inputText, { color: colors.text }]}
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
              />
            </View>
          </View>
          {touched.email && errors.email && (
            <Text style={styles.errorMessage}>{errors.email}</Text>
          )}
          {/*<Text style={styles.errorMessage}>{emailErrorMessage}</Text>*/}
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
                value={values.password}
                autoCapitalize="none"
                style={[styles.inputText, { color: colors.text }]}
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
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
          {touched.password && errors.password && (
            <Text style={styles.errorMessage}>{errors.password}</Text>
          )}
          {/*<Text style={styles.errorMessage}>{errorMessage}</Text>*/}
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
                placeholder="Confirmar contraseña"
                placeholderTextColor={"grey"}
                selectionColor={"grey"}
                value={values.passwordConfirm}
                autoCapitalize="none"
                style={[styles.inputText, { color: colors.text }]}
                onChangeText={handleChange("passwordConfirm")}
                onBlur={() => setFieldTouched("passwordConfirm")}
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
          {touched.passwordConfirm && errors.passwordConfirm && (
            <Text style={styles.errorMessage}>{errors.passwordConfirm}</Text>
          )}
          <TouchableOpacity
            style={[styles.signinButton, { backgroundColor: (isValid && dirty) ? colors.tint : colors.tintBlock}, ]}
            onPress={(e) => {
              signup( {variables: { userInput: { name: values.name, clave: values.password, correo: values.email } } });
            }}
            disabled={!(isValid && dirty)}
          >
            {isLoading ? (
              <LottieView
                source={require("../../assets/loading.json")}
                autoPlay
              />
            ) : (
              <Text style={styles.signinButtonText}>Crear Cuenta</Text>
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    backgroundColor: "grey",
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginTop: 15,
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
  orText: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: "black",
    fontFamily: "Poppins_Medium",
    marginLeft: 5,
    alignSelf: "center",
    marginTop: 20,
  },
  signinButtonLogoContainer: {
    backgroundColor: "white",
    padding: 2,
    borderRadius: 3,
    position: "absolute",
    left: 25,
  },
  signinButtonLogo: {
    height: 18,
    width: 18,
  },
  errorMessage: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    color: "red",
    fontFamily: "Poppins_Medium",
    marginHorizontal: 20,
  },
});

export default SignupScreen;
