import { StyleSheet } from "react-native";
import { useTheme } from "../../components/ThemeProvider";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
const styles = () => {
  const { dark, colors, setScheme } = useTheme();
  /*const [fontsLoaded] = useFonts({
    Poppins_regular: require("../../assets/fonts/Poppins-Regular.ttf"),
  });

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
  }, [fontsLoaded]);*/

  return StyleSheet.create({
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
      backgroundColor: colors.tint,
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
      height: 20,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
    signinButtonText: {
      fontSize: 18,
      lineHeight: 18 * 1.4,
      color: colors.text,
      fontFamily: "Poppins_Medium",
    },
  });
};

export default styles;
