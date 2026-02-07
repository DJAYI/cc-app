import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type CurrencyItemProps = {
  item: { code: string; name: string; countryCode: string };
  isSelected?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function CurrencyItem({
  item,
  isSelected = false,
  isDisabled = false,
  onPress,
}: CurrencyItemProps) {
  const animatedBackground = useRef(new Animated.Value(0)).current;
  const animatedScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(animatedBackground, {
      toValue: isSelected ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();

    Animated.spring(animatedScale, {
      toValue: isSelected ? 0.99 : 1,
      friction: 5,
      useNativeDriver: false,
    }).start();
  }, [animatedBackground, animatedScale, isSelected]);

  return (
    <AnimatedPressable
      disabled={isDisabled}
      onPress={onPress}
      style={[
        styles.container,
        styles.pressableContent,
        {
          opacity: isDisabled ? 0.4 : 1,
          backgroundColor: animatedBackground.interpolate({
            inputRange: [0, 1],
            outputRange: ["#FFFFFF", "#F0F0F0"],
          }),
          transform: [{ scale: animatedScale }],
        },
      ]}
    >
      <View
        style={{
          width: 48,
          height: 48,
          overflow: "hidden",
          borderRadius: 24,
          backgroundColor: "#D1D5DB",
        }}
      >
        <Image
          source={{
            uri: `https://flagsapi.com/${item.countryCode}/flat/64.png`,
          }}
          style={{
            width: 48,
            height: 48,
            transform: [
              {
                scale: 1.8,
              },
            ],
          }}
        />
      </View>

      <View className="flex-1">
        <Text className="font-semibold text-lg">{item.code}</Text>
        <Text className="text-gray-500 text-sm">{item.name}</Text>
      </View>

      {isSelected && (
        <Animated.View style={{ transform: [{ scale: animatedScale }] }}>
          <Ionicons name="checkmark-circle" size={24} color="black" />
        </Animated.View>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    marginBottom: 10,
  },
  pressableContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
