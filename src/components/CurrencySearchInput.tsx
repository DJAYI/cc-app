import Fontisto from "@expo/vector-icons/Fontisto";
import { TextInput, View } from "react-native";

export function CurrencySearchInput({ onChange }) {
  return (
    <View className="flex-row relative rounded-xl items-center bg-gray-200/70">
      <Fontisto
        name="search"
        size={20}
        color="gray"
        style={{ position: "absolute", left: 20 }}
      />
      <TextInput
        className="ms-14 px-5 py-4 flex-1 text-xl"
        placeholder="Search currency"
        onChangeText={onChange}
      />
    </View>
  );
}
