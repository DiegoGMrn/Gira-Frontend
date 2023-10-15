import React, {useState} from 'react';
import {TouchableOpacity, Animated, StyleSheet, Easing} from 'react-native';
import { useTheme } from './ThemeProvider';




interface ToggleButtonProps {
    size: number;
}

const ToggleButton = ({size}: ToggleButtonProps) => {
  const [isActive, setIsActive] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  const { dark, colors, setScheme } = useTheme();

  const containerStyle = (size: number, isActive: boolean) => ({
    backgroundColor: isActive ? colors.tint : "grey",
    height: 32 * size,
    width: 64 * size,
    borderRadius: 32,
    padding: 4 * size,
  });
  
  const toggleStyle = (size: number, animatedValue: Animated.Value) => ({
    height: 24 * size,
    width: 24 * size,
    backgroundColor: "white",
    borderRadius: 32,
    transform: [
      {
        translateX: animatedValue,
      },
    ],
  });

  const toggleHandle = () => {
    Animated.timing(animatedValue, {
      toValue: isActive ? 0 : 32 * size,
      duration: 250,
      easing: Easing.bounce,
      delay: 0,
      useNativeDriver: true,
    }).start();
    setIsActive(!isActive);
  };

  return (
    <TouchableOpacity
      style={containerStyle(size, isActive)}
      onPress={() => toggleHandle()}
      activeOpacity={0.8}>
      <Animated.View style={toggleStyle(size, animatedValue)} />
    </TouchableOpacity>
  );
};

export default ToggleButton;