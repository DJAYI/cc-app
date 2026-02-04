import { Animated, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext, ThemeProvider } from "./lib/theme/ThemeContext";
import { useContext, useEffect, useRef } from "react";
import { useAnimatedThemeColors } from "./hooks/UseAnimatedThemeColors";
import { ScrollView } from "react-native-gesture-handler";

interface Props {
  children?: React.ReactNode;
}

export function LayoutScreen({ children }: Props) {
  return (
    <ThemeProvider>
      <ScrollView>
        <LayoutContent>{children}</LayoutContent>
      </ScrollView>
    </ThemeProvider>
  );
}

export function LayoutContent({ children }: Props) {
  const insets = useSafeAreaInsets();

  const animationValue = useRef(new Animated.Value(0)).current;
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: theme === "light" ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [theme, animationValue]);

  const { primary } = useAnimatedThemeColors(animationValue);
  return (
    <Animated.View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        {
          backgroundColor: primary.background,
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingInline: 16,
    flex: 1,
    gap: 24,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
