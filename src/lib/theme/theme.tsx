import { COLORS } from "@/constants/colors";
import { Animated } from "react-native";

export const themeColors = {
  light: { ...COLORS.light },
  dark: { ...COLORS.dark },
};

export const createAnimatedColorPalette = <T extends Record<string, string>>(
  animationValue: Animated.Value,
  lightColors: T,
  darkColors: T,
): { [K in keyof T]: Animated.AnimatedInterpolation<string> } =>
  Object.keys(lightColors).reduce(
    (acc, key) => {
      acc[key as keyof T] = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [lightColors[key as keyof T], darkColors[key as keyof T]],
      });
      return acc;
    },
    {} as { [K in keyof T]: Animated.AnimatedInterpolation<string> },
  );
