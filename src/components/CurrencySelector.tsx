import React, { useEffect, useRef } from "react";
import {
  View,
  Pressable,
  Text,
  Image,
  ImageSourcePropType,
  GestureResponderEvent,
  Animated,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

export type CurrencySelectorProps = {
  leftImage: ImageSourcePropType;
  rightImage?: ImageSourcePropType;
  fromCurrency: string;
  toCurrency: string;
  onPress?: (event: GestureResponderEvent) => void;
  containerClassName?: string;
};

export function CurrencySelector({
  leftImage,
  rightImage,
  fromCurrency,
  toCurrency,
  onPress,
  containerClassName,
}: CurrencySelectorProps) {
  const animationTime = useRef(new Animated.Value(0)).current;
  const scale = animationTime.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95],
  });

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        className={`px-6 bg-black rounded-full flex flex-row items-center gap-2 ${containerClassName ?? ""}`}
        onPress={onPress}
        onPressIn={() => {
          Animated.timing(animationTime, {
            toValue: 1,
            duration: 100,
            useNativeDriver: false,
          }).start();
        }}
        onPressOut={() => {
          Animated.timing(animationTime, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false,
          }).start();
        }}
      >
        <View className="flex flex-row relative">
          <View
            style={{
              width: 25,
              height: 25,
              borderWidth: 2,
              zIndex: 1,
              borderColor: "black",
              overflow: "hidden",
              borderRadius: 25 / 2,
            }}
          >
            <Image
              source={leftImage}
              style={{
                width: 25,
                height: 25,
                transform: [{ scale: 1.8 }],
              }}
            />
          </View>
          <View
            style={{
              width: 25,
              height: 25,
              marginLeft: -10,
              borderWidth: 2,
              overflow: "hidden",
              borderRadius: 25 / 2,
              borderColor: "transparent",
            }}
          >
            <Image
              source={rightImage ?? leftImage}
              style={{
                width: 25,
                height: 25,
                transform: [{ scale: 1.8 }],
              }}
            />
          </View>
        </View>

        <Text className="text-white ">
          <Text className="font-semibold text-lg">{fromCurrency}</Text> to{" "}
          <Text className="font-semibold text-lg">{toCurrency}</Text>
        </Text>

        <Entypo
          style={{
            marginRight: 8,
          }}
          name="chevron-small-down"
          size={24}
          color="white"
        />
      </Pressable>
    </Animated.View>
  );
}
