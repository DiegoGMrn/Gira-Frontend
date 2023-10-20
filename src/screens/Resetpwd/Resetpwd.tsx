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
