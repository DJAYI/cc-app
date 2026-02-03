import { Image, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { TextInput } from "react-native-gesture-handler";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Foundation from "@expo/vector-icons/Foundation";

interface CurrencyInputRowProps {
  countryCode: string;
  currencyCode: string;
  currencyName: string;
  size?: number;
}

interface CurrencyInputConversorProps {
  currencyFrom: CurrencyInputRowProps;
  currencyTo: CurrencyInputRowProps;
}

export function CurrencyInputConversor({
  currencyFrom,
  currencyTo,
}: CurrencyInputConversorProps) {
  return (
    <View
      className={"flex flex-col bg-white rounded-4xl w-full overflow-hidden"}
    >
      <View className="focus:bg-gray-50">
        <CurrencyInputRow
          countryCode={currencyFrom.countryCode}
          currencyCode={currencyFrom.currencyCode}
          currencyName={currencyFrom.currencyName}
        />
      </View>

      <View className={"h-px bg-gray-300 relative"}>
        <View
          className={
            "absolute left-1/2 -translate-x-1/2 -top-5 bg-black py-2 px-6 rounded-full z-10"
          }
        >
          <View className="flex flex-row justify-around items-center">
            <Text className={"text-white font-bold text-sm"}>
              1 USD = 3,945.50 COP
            </Text>

            <View className="ml-4 flex flex-row items-center gap-2 bg-red-500/10 px-3 py-1 rounded-full">
              <FontAwesome6 name="arrow-trend-down" size={16} color="#ffa2a2" />
              <Text className="text-red-300 font-medium text-sm">-0.5%</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="focus:bg-gray-50">
        <CurrencyInputRow
          countryCode={currencyTo.countryCode}
          currencyCode={currencyTo.currencyCode}
          currencyName={currencyTo.currencyName}
        />
      </View>
    </View>
  );
}

function CurrencyInputRow({
  countryCode,
  currencyCode,
  currencyName,
  size = 32,
}: CurrencyInputRowProps) {
  return (
    <>
      <View className={"flex flex-col py-7 px-6 "}>
        <View className={"flex flex-row justify-start gap-2.5 items-center"}>
          <View
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              overflow: "hidden",
              backgroundColor: "#fff", // opcional
              borderWidth: 1,
              borderColor: "#ccc", // opcional
            }}
          >
            <Image
              source={{
                uri: `https://flagsapi.com/${countryCode}/flat/64.png`,
              }}
              style={{
                width: size,
                height: size,
                transform: [
                  {
                    scale: 1.8,
                  },
                ],
              }}
            />
          </View>

          <Text className={"font-black text-xl"}>{currencyCode}</Text>

          <Text className={"font-normal text-base"}>{currencyName}</Text>
        </View>

        <View className="flex flex-row items-center">
          <Foundation
            name="dollar"
            size={38}
            color="lightgray"
            style={{ marginRight: 4, marginTop: 10 }}
          />
          <TextInput
            inputMode="decimal"
            cursorColor="black"
            className="flex-1 text-5xl font-bold text-black h-22"
            placeholder="0"
            placeholderTextColor="#000"
          />
        </View>
      </View>
    </>
  );
}
