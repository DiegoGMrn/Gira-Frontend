import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { useTheme } from "../../components/ThemeProvider";
import styless from "../Styles";
import { useMutation, gql } from "@apollo/client";
import Toast from "react-native-toast-message";
import * as Yup from "yup";
import { Formik } from "formik";
import Display from "../../utils/Display";
import { Feather } from "@expo/vector-icons";
interface ChangepwdAppScreenProps {
  navigation: NavigationProp<any>;
}

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .required("Por favor ingrese su contraseña.")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial."
    ),
  passwordConfirm: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .required("Por favor ingrese su contraseña.")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial."
    ),
});

const ChangepwdAppScreen = ({ navigation }: ChangepwdAppScreenProps) => {
  const { dark, colors, setScheme } = useTheme();
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [newpassword, onChangeNewPassword] = useState("");
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const showToastSuccess = () => {
    Toast.show({
      type: "success",
      text1: "Contraseña cambiada",
      text2: "Su contraseña ha sido cambiada exitosamente.",
      position: "top",
      topOffset: 30,
    });
  };

  const showToastError = () => {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Ha ocurrido un error, por favor intente de nuevo.",
      position: "top",
      topOffset: 30,
    });
  };

  const login_m = gql`
    mutation resetPassword($resetPasswordInput: UpdatePasswordInput!) {
      resetPassword(resetPasswordInput: $resetPasswordInput)
    }
  `;
  const [changePassword] = useMutation(login_m, {
    onCompleted: (data) => {
      const response = data.resetPassword;
      console.log(response);
      if (response == true) {
        showToastSuccess();
        navigation.navigate("Settings");
      } else {
        showToastError();
        navigation.navigate("Settings");
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
        dirty,
      }) => (
        <View
          style={[styles.container, { backgroundColor: colors.background2 }]}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
              <Ionicons name="ios-arrow-back" size={24} color={colors.tint} />
            </TouchableOpacity>
            <Text style={[styles.headerText, { color: colors.text }]}>
              Cambiar Contraseña
            </Text>
          </View>

          {/* Opciones de Configuración */}
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
                placeholder="Contraseña actual"
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
                placeholder="Nueva contraseña"
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
            style={[styles.signinButton, { backgroundColor: colors.tint }]}
          >
            <Text
              style={styles.signinButtonText}
              onPress={(e) => {
                changePassword({
                  variables: {
                    resetPasswordInput: {
                      claveAntigua: values.password,
                      claveNueva: values.passwordConfirm,
                    },
                  },
                });
              }}
            >
              Cambiar Contraseña
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    paddingBottom: 12,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 16,
  },
  settingOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  optionText: {
    fontSize: 18,
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: "center",
    padding: 0,
    height: Display.setHeight(6),
    color: "black",
    flex: 1,
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
  errorMessage: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    color: "red",
    fontFamily: "Poppins_Medium",
    marginHorizontal: 20,
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
});

export default ChangepwdAppScreen;
