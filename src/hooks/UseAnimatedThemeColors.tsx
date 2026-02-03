import { COLORS } from "@/constants/colors";
import { createAnimatedColorPalette } from "@/lib/theme/theme";
import { Animated } from "react-native";

export const useAnimatedThemeColors = (animationValue: Animated.Value) => ({
  primary: createAnimatedColorPalette(
    animationValue,
    COLORS.light.primary,
    COLORS.dark.primary,
  ),
  secondary: createAnimatedColorPalette(
    animationValue,
    COLORS.light.secondary,
    COLORS.dark.secondary,
  ),
});
