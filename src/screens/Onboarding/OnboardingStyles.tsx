import { StyleSheet } from "react-native";
import { useTheme } from "../../components/ThemeProvider";

const styles = () => {
  const { dark, colors, setScheme } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
      paddingBottom: 40,
    },
    illustrationWrapper: { display: "flex", alignItems: "center" },
    illustrationContent: {
      height: 300,
      width: 250,
      resizeMode: "contain",
      marginTop: 80,
      marginBottom: 30,
    },
    largeText: {
      fontWeight: "bold",
      color: colors.text,
      fontSize: 26,
      lineHeight: 32,
      marginBottom: 15,
    },
    smallText: {
      fontSize: 16,
      color: colors.textSecondary,
      fontWeight: "normal",
      marginBottom: 60,
    },
    loginBtnWrapper: {
      backgroundColor: colors.tint,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 45,
      borderRadius: 20,
      marginBottom: 15,
      marginHorizontal: 50,
    },
    loginBtnText: { fontWeight: "bold", fontSize: 16, color: colors.background },
    signUpBtnWrapper: {
      backgroundColor: colors.tint,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 45,
      marginHorizontal: 50,
      borderRadius: 20,
    },
    signUpBtnText: { fontWeight: "bold", fontSize: 16, color: colors.background },
  });
};

export default styles;
