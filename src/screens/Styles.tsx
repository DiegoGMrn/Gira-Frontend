import { StyleSheet } from "react-native";
import { useTheme } from "../components/ThemeProvider";


const styles = () => {
  const { dark, colors, setScheme } = useTheme();
  return StyleSheet.create({
    container: {
        backgroundColor: colors.background2,
        flex: 1,
      },
      statusBar: {
        backgroundColor: "transparent", 
      },
      background: {
        position: "absolute",
        height: "100%",
        width: "100%",
      },
      titleFormContainer: {
        flex: 1,
        justifyContent: "space-around",
        paddingTop: "auto",
        paddingBottom: 40,
        elevation: 1,
      },
      titleContainer: {
        alignItems: "center",
      },
      titleText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 48,
        textAlign: "center",
      },
      formContainer: {
        alignItems: "center",
        marginHorizontal: 20,
        marginTop: 16,
        
      },
      inputContainer: {
        backgroundColor: colors.bgInput, 
        padding: 10,
        borderRadius: 16,
        width: "100%",
        marginTop: 10,
        
      },
      input: {
        color: colors.text,
        
      },
      buttonContainer: {
        width: "100%",
      },
      button: {
        backgroundColor: colors.tint, 
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
        color: colors.text,
        fontSize: 13,
      },
      signUpLink: {
        color: colors.tint, 
        fontFamily: "Poppins_Regular",
        fontWeight: "bold",

      },
      resetpwdContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingBottom: 10,
      },
      resetpwdText: {
        color: colors.tint,
        textAlign: "right",
        fontWeight: "bold",
      },
      errorText: {
        color: "red",
        textAlign: "left",
        fontSize: 12,
      },
  });
};

export default styles;