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
import { NavigationProp } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";
import * as Yup from "yup";
import { Formik } from "formik";

interface ForgotPasswordScreenProps {
  navigation: NavigationProp<any>;
}
const SignupSchema = Yup.object().shape({
  email: Yup.string().required("Por favor ingrese su correo.").nullable(),
});

const ForgotPasswordScreen = ({ navigation }: ForgotPasswordScreenProps) => {
  const { dark, colors, setScheme } = useTheme();
  const [email, onChangeEmail] = useState("");

  const resetpwd_m = gql`
    mutation recoveryPass($recoveryPassInput: RecoveryPassInput!) {
      recoveryPass(recoveryPassInput: $recoveryPassInput) 
      }

  `;

  const [resetpwd] = useMutation(resetpwd_m, {
    onCompleted: (data) => {
      console.log(data);
      console.log("email", email)
      navigation.navigate("Validationcode", { email: email });
    },
  });

  return (
    <Formik
      initialValues={{
        email: "",
        isValid: false,
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
              ¿Olvidaste tu contraseña?
            </Text>
          </View>
          <Text style={[styles.title, { color: colors.text }]}>
            Restablecer Contraseña
          </Text>
          <Text style={[styles.content, { color: colors.text }]}>
            Ingresa tu correo electrónico para restablecer tu contraseña.
          </Text>
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
                placeholder="Email"
                placeholderTextColor={"grey"}
                selectionColor={"grey"}
                style={[styles.inputText, { color: colors.text }]}
                value={values.email}
                onChangeText={(text) => {
                  onChangeEmail(text);
                  handleChange("email")(text);
                }}
                onBlur={() => setFieldTouched("email")}

              />
            </View>
          </View>
          {touched.email && errors.email && (
            <Text style={styles.errorMessage}>{errors.email}</Text>
          )}
          <TouchableOpacity
            style={[styles.signinButton, { backgroundColor: (isValid && dirty) ? colors.tint : colors.tintBlock }]}
            onPress={(e) => {
              resetpwd({variables: {recoveryPassInput: {correo: values.email}}});
            }}
            disabled={!(isValid && dirty)}
          >
            <Text
              style={styles.signinButtonText}
              
            >
              Restablecer Contraseña
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
  errorMessage: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    color: "red",
    fontFamily: "Poppins_Medium",
    marginHorizontal: 20,
  },
});

export default ForgotPasswordScreen;
