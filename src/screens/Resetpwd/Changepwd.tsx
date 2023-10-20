/*import React, { useState } from "react";
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
import { gql, useMutation } from "@apollo/client";
import styles from "../Styles";

interface ResetpwdProps {
  navigation: NavigationProp<any>; 
}

const Resetpwd = ({ navigation }: ResetpwdProps) => {
  const register_m = gql`
    mutation createCats($catInput: CreateCatInput!) {
      createCats(catInput: $catInput) {
        id
        name
        clave
      }
    }
  `;
  const { dark, colors, setScheme } = useTheme();
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [createCats, { data, loading, error }] = useMutation(register_m);



  return (
    <KeyboardAvoidingView
      style={styles().container}
      /*behavior={Platform.OS === "ios" ? "padding" : "height"} // Solo establece 'padding' en iOS
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -150} // Ajusta el valor según tus necesidades
      enabled={Platform.OS === "ios"} // Habilita solo en iOS
    >
      <StatusBar style="light" />
      {/*<Image
        source={dark ? require("../../assets/BgAuthDark.png") : require("../../assets/BgAuthLight.png")}
        style={styles().background}
  />}
      {/* title and form }
      <View style={styles().titleFormContainer}>
        {/* title }
        <View style={styles().titleContainer}>
          <Text
            /*entering={FadeInUp.duration(1000).springify()}
            style={styles().titleText}
          >
            Restablecer Contraseña
          </Text>
        </View>

        {/* form }
        <View style={styles().formContainer}>
            <Text style={[styles().signUpText, {paddingBottom: 20}]}>Enviaremos una nueva contraseña a tu correo electronico.</Text>
          <View
            /*entering={FadeInDown.duration(1000).springify()}
            style={styles().inputContainer}
          >
            <TextInput
              placeholder="Correo"
              placeholderTextColor="gray"
              value={email}
              onChangeText={(text) => onChangeEmail(text)}
            />
          </View>
          <TouchableOpacity style={styles().resetpwdContainer}>
            <Text style={styles().resetpwdText}></Text>
          </TouchableOpacity>
          <View style={styles().buttonContainer}>
            <TouchableOpacity
              style={styles().button}
              onPress={() => {navigation.navigate("Validationcode", {email: email})}}
            >
              <Text style={styles().buttonText}>Enviar</Text>
            </TouchableOpacity>
          </View>

          <View
            /*entering={FadeInDown.delay(400).duration(1000).springify()}
            style={styles().signUpContainer}
          >
            <Text style={styles().signUpText}></Text>
            <TouchableOpacity >
              <Text style={styles().signUpLink}></Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default Resetpwd;*/

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import Separator from "../../components/Separator";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "../../components/ThemeProvider";
import Display from "../../utils/Display";
import { NavigationProp, useRoute } from "@react-navigation/native";
import { useMutation, gql } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";

interface ChangePasswordScreenProps {
  navigation: NavigationProp<any>;
}

interface ChangepwdRouteProps {
  route: {
    params: {
      email: string;
    };
  };
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
    .min(8)
    .oneOf([Yup.ref("password"), ""], "Las contraseñas deben coincidir.")
    .required("Por favor confirme su contraseña."),
});

const ChangePasswordScreen = (
  { navigation }: ChangePasswordScreenProps,
  { route }: ChangepwdRouteProps
) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const { dark, colors, setScheme } = useTheme();
  const [email, onChangeEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, onChangeConfirmPassword] = useState("");
  const route2 = useRoute();

  const showToastSuccess = () => {
    Toast.show({
      type: "success",
      text1: "Contraseña cambiada",
      text2: "Su contraseña ha sido cambiada exitosamente.",
    });
  }

  const showToastError = () => {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Ha ocurrido un error, por favor intente de nuevo.",
    });
  }

  const changepwd_m = gql`
    mutation resetPassword2($resetPasswordInput: UpdatePasswordInput2!) {
      resetPassword2(resetPasswordInput: $resetPasswordInput)
    }
  `;

  const [changepwd] = useMutation(changepwd_m, {
    onCompleted: (data) => {
      const confirm = data.resetPassword2;
      console.log(confirm);
      if (confirm == true) {
        showToastSuccess();
        navigation.navigate("Login");
      } else {
        showToastError();
        navigation.navigate("Login");
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
              Cambiar Contraseña
            </Text>
          </View>
          <Text style={[styles.title, { color: colors.text }]}>
            Cambiar Contraseña
          </Text>
          <Text style={[styles.content, { color: colors.text }]}>
            Ingresa tu nueva contraseña.
          </Text>
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
            style={[styles.signinButton, { backgroundColor: colors.tint }]}
          >
            <Text
              style={styles.signinButtonText}
              onPress={(e) => {
                changepwd({
                  variables: {
                    resetPasswordInput: {
                      correo: route2.params.email,
                      claveNueva: values.password,
                    },
                  },
                });
              }}
            >
              Cambiar Contraseña
            </Text>
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

export default ChangePasswordScreen;
