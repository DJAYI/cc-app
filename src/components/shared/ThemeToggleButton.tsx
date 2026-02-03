import { Pressable, Text } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "@/lib/theme/ThemeContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export function ThemeToggleButton() {
  const { toggleTheme, theme } = useContext(ThemeContext);

  return (
    <Pressable
      className={`p-2 rounded-full items-center justify-center ${
        theme === "dark" ? "bg-gray-200" : "bg-black"
      }`}
      onPress={toggleTheme}
    >
      {theme === "dark" ? (
        <MaterialIcons name="dark-mode" size={20} color="black" />
      ) : (
        <MaterialIcons name="light-mode" size={20} color="white" />
      )}
    </Pressable>
  );
}
