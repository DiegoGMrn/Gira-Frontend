import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";
import Separator from "../../components/Separator";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../components/ThemeProvider";
//import styles from "./ValidationStyles";
import { NavigationProp, useRoute } from "@react-navigation/native";
import { useEffect, useCallback } from "react";
import { FontSource } from "expo-font";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
interface ValidationCodeProps {
  navigation: NavigationProp<any>;
}

interface ValidationCodeRouteProps {
  route: {
    params: {
      email: string;
    };
  };
}

const Validationcode = ({ navigation }: ValidationCodeProps, {route}: ValidationCodeRouteProps) => {
  const firstInput = useRef<TextInput>(null);
  const secondInput = useRef<TextInput>(null);
  const thirdInput = useRef<TextInput>(null);
  const fourthInput = useRef<TextInput>(null);
  const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "" });
  const { dark, colors, setScheme } = useTheme();
  const route2 = useRoute();

  const [fontsLoaded] = useFonts({
    Poppins_Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
    Poppins_Back: require("../../assets/fonts/Poppins-Black.ttf"),
    Poppins_Medium: require("../../assets/fonts/Poppins-Medium.ttf"),
  });
  console.log("route", route);
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
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
      width: "80%",
      textAlign: "center",
      color: colors.text,
    },
    title: {
      fontSize: 20,
      fontFamily: "Poppins_Medium",
      lineHeight: 20 * 1.4,
      marginTop: 50,
      marginBottom: 10,
      marginHorizontal: 20,
      color: colors.text,
    },
    content: {
      fontSize: 20,
      fontFamily: "Poppins_Medium",
      marginTop: 10,
      marginBottom: 20,
      marginHorizontal: 20,
      color: colors.text,
    },
    phoneNumberText: {
      fontSize: 18,
      fontFamily: "Poppins_Regular",
      lineHeight: 18 * 1.4,
      color: colors.tint,
    },
    otpContainer: {
      marginHorizontal: 20,
      marginBottom: 20,
      justifyContent: "space-evenly",
      alignItems: "center",
      flexDirection: "row",
    },
    otpBox: {
      borderRadius: 5,
      borderColor: colors.tint,
      borderWidth: 0.5,
    },
    otpText: {
      fontSize: 25,
      color: colors.text,
      padding: 0,
      textAlign: "center",
      paddingHorizontal: 18,
      paddingVertical: 10,
    },
    signinButton: {
      backgroundColor: colors.tint,
      borderRadius: 8,
      marginHorizontal: 20,
      height: 50,
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

  if (!fontsLoaded) return null;
  return (
    <KeyboardAvoidingView style={styles.container} onLayout={onLayout}>
      <StatusBar
        barStyle={dark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
          color={colors.text}
          
        />
        <Text style={styles.headerTitle}>OTP Verification</Text>
      </View>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.content}>
        Enter the OTP number just sent you at{" "}
        <Text style={styles.phoneNumberText}>{route2.params.email}</Text>
      </Text>
      <View style={styles.otpContainer}>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={firstInput}
            onChangeText={(text) => {
              setOtp({ ...otp, 1: text });
              text && secondInput.current?.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={secondInput}
            onChangeText={(text) => {
              setOtp({ ...otp, 2: text });
              text ? thirdInput.current?.focus() : firstInput.current?.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={thirdInput}
            onChangeText={(text) => {
              setOtp({ ...otp, 3: text });
              text
                ? fourthInput.current?.focus()
                : secondInput.current?.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={fourthInput}
            onChangeText={(text) => {
              setOtp({ ...otp, 4: text });
              !text && thirdInput.current?.focus();
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.signinButton}
        onPress={() => console.log(otp)}
      >
        <Text style={styles.signinButtonText}>Verify</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
  
};




export default Validationcode;
