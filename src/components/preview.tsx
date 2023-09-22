import React from "react";
import { View, Text, StyleSheet, useColorScheme, Switch } from "react-native";
import { useState } from "react";

export default function componente() {
  const isDarkMode = useColorScheme() === "dark";
  const [isDark, setIsDark] = useState(isDarkMode);
  return (
    <div></div>
  );
}

const styles = StyleSheet.create({
  highlight: {
    fontWeight: "700",
  },
});
