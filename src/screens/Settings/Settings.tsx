import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { useTheme } from "../../components/ThemeProvider";
interface SettingsScreenProps {
  navigation: NavigationProp<any>;
}

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const { dark, colors, setScheme } = useTheme();
  const toggleTheme = () => {
    setScheme(dark ? "light" : "dark");
  };
  return (
    <View style={[styles.container, { backgroundColor: colors.background2 }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="ios-arrow-back" size={24} color={colors.tint} />
        </TouchableOpacity>
        <Text style={[styles.headerText, {color: colors.text}]}>Configuración</Text>
      </View>

      {/* Opciones de Configuración */}
      <TouchableOpacity
        style={styles.settingOption}
        onPress={() => navigation.navigate("ChangepwdApp")}
      >
        <Text style={[styles.optionText, {color: colors.text}]}>Cambiar Contraseña</Text>
        {/*<Ionicons name="ios-arrow-forward" size={24} color={colors.tint} />*/}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingOption}
        onPress={() => navigation.navigate("ChangeTheme")}
      >
        <Text style={[styles.optionText, {color: colors.text}]}>Tema</Text>
        <Switch value={dark} onValueChange={toggleTheme} />
        {/*<Ionicons name="ios-arrow-forward" size={24} color={colors.tint} />*/}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,

  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    paddingBottom: 12,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 16,
    
  },
  settingOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  optionText: {
    fontSize: 18,
  },
});

export default SettingsScreen;
