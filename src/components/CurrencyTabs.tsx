import { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";

export function CurrencyTabs({ tabSelected, onTabChange }) {
  const position = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(position, {
      toValue: tabSelected === "from" ? 0 : 1,
      friction: 8,
      tension: 50,
      useNativeDriver: false,
    }).start();
  }, [position, tabSelected]);

  return (
    <View className="flex flex-row gap-2.5 justify-around relative items-center bg-gray-100 p-2.5 rounded-xl">
      {["from", "to"].map((tab) => (
        <Pressable
          key={tab}
          className="flex-1 z-10"
          onPress={() => onTabChange(tab)}
        >
          <Text className="text-black font-semibold text-center p-2.5 text-lg">
            {tab.toUpperCase()}
          </Text>
        </Pressable>
      ))}

      <Animated.View
        style={{
          position: "absolute",
          width: "50%",
          height: 40,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
          borderRadius: 12,
          backgroundColor: "white",
          insetInline: position.interpolate({
            inputRange: [0, 1],
            outputRange: ["3%", "52.1%"],
          }),
        }}
      />
    </View>
  );
}
