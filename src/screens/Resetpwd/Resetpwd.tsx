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
      enabled={Platform.OS === "ios"} // Habilita solo en iOS*/
    >
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
            Restablecer Contraseña
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
              onPress={() => {navigation.navigate("Validationcode", {email: email})}}
            >
              <Text style={styles().buttonText}>Enviar</Text>
            </TouchableOpacity>
          </View>

          <View
            /*entering={FadeInDown.delay(400).duration(1000).springify()}*/
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

export default Resetpwd;
