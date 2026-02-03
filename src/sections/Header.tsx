import { ThemeToggleButton } from "@/components/shared/ThemeToggleButton";
import { CurrencySelector } from "@/components/CurrencySelector";
import { ThemeContext } from "@/lib/theme/ThemeContext";
import Feather from "@expo/vector-icons/Feather";
import { useContext } from "react";
import { View, Text, Pressable } from "react-native";

interface HeaderProps {
  onOpenSettings?: () => void;
}
export function Header({ onOpenSettings }: HeaderProps) {
  const { theme } = useContext(ThemeContext);

  // handler forwarded from parent (no-op if not provided)
  const handlePresentModalPress = onOpenSettings ?? (() => {});

  return (
    <View className="flex flex-col items-center gap-4 py-6">
      <View className="justify-between items-start flex-row w-full">
        <Text className="text-2xl font-semibold">Logo</Text>

        <View className="flex-row gap-2 items-center">
          <Pressable
            className={`p-2 rounded-full items-center justify-center ${
              theme === "dark" ? "bg-gray-200" : "bg-black"
            }`}
          >
            <Feather
              name="settings"
              size={20}
              color={theme === "dark" ? "black" : "white"}
            />
          </Pressable>
          <ThemeToggleButton />
        </View>
      </View>
      <View className="bg-gray-300 pb-px self-stretch"></View>
    </View>
  );
}
