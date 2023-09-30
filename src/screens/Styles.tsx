import { StyleSheet } from "react-native";
import { useTheme } from "../components/ThemeProvider";

const styles = () => {
  const { dark, colors, setScheme } = useTheme();
  return StyleSheet.create({
    container: {
        backgroundColor: colors.background,
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
        paddingTop: 100,
        paddingBottom: 40,
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
        backgroundColor: colors.bgInput, // Ajusta el color de fondo según tus necesidades
        padding: 10,
        borderRadius: 16,
        width: "100%",
        marginBottom: 10,
      },
      input: {
        color: colors.text,
        
      },
      buttonContainer: {
        width: "100%",
      },
      button: {
        backgroundColor: colors.tint, // Cambia esto al color deseado
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
      },
      signUpLink: {
        color: colors.tint, // Cambia esto al color deseado
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
  });
};

export default styles;