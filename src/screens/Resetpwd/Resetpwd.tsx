import React, { useState } from "react";
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
  navigation: NavigationProp<any>; // Puedes ajustar el tipo según tu configuración
}

function Resetpwd({ navigation }: ResetpwdProps) {
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

  /*
  if (loading) return console.log(JSON.stringify(loading, null, 2));
  if (error) return console.log(JSON.stringify(error, null, 2));
  if (data) return console.log(JSON.stringify(data, null, 2));*/

  return (
    <KeyboardAvoidingView
      style={styles().container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Solo establece 'padding' en iOS
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -150} // Ajusta el valor según tus necesidades
      enabled={Platform.OS === "ios"} // Habilita solo en iOS
    >
      <StatusBar style="light" />
      <Image
        source={dark ? require("../../assets/BgAuthDark.png") : require("../../assets/BgAuthLight.png")}
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
            Resetear Contraseña
          </Text>
        </View>

        {/* form */}
        <View style={styles().formContainer}>
            <Text style={[styles().signUpText, {paddingBottom: 20}]}>Enviaremos una nueva contraseña a tu correo electronico.</Text>
          <View
            /*entering={FadeInDown.duration(1000).springify()}*/
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
              onPress={(e) => {
                e.preventDefault();
                createCats({
                  variables: { catInput: { name: email, clave: password } },
                }),
                  navigation.goBack(),
                  console.log(JSON.stringify(data, null, 2));
              }}
            >
              <Text style={styles().buttonText}>Enviar</Text>
            </TouchableOpacity>
          </View>

          <View
            /*entering={FadeInDown.delay(400).duration(1000).springify()}*/
            style={styles().signUpContainer}
          >
            <Text style={styles().signUpText}></Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles().signUpLink}></Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
/*const styles = StyleSheet.create({
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
});*/

export default Resetpwd;
