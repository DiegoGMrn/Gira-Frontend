import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Componente from "./components/preview";
import HomeScreen from "./screens/HomeScreen";
import { ThemeProvider } from "./components/ThemeProvider";

export default function App() {

  return (
    <ThemeProvider>
      <HomeScreen/>
    </ThemeProvider>
  );
}


const styles = StyleSheet.create({
  getStartedContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    marginHorizontal: 50,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
