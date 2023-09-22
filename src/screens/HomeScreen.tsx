import React from "react";
import { View, Text, StyleSheet, useColorScheme, Switch } from "react-native";
import { useTheme } from "../components/ThemeProvider";

const HomeScreen = () => {
  const { dark, colors, setScheme } = useTheme();

    const toggleTheme=() => {
        setScheme(dark ? "light" : "dark");
    };


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Switch value={dark} onValueChange={toggleTheme} />
      <Text style={[styles.highlight, { color: colors.text }]}>App.tsx</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  highlight: {
    fontWeight: "700",
  },
});

export default HomeScreen;
