import "./global.css";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LayoutScreen } from "./_layout";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useCallback, useEffect, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Dimensions, Pressable, Text, View } from "react-native";
import { CurrencySelector } from "./components/CurrencySelector";
import { CurrencyInputConversor } from "./components/CurrencyInputConversor";
import { CurrencySelectorBottomSheet } from "./components/CurrencySelectorBottomSheet";
import Feather from "@expo/vector-icons/Feather";

import { CurrencyHistoricalChart } from "./components/CurrencyHistoricalChart";
import { getCurrencies } from "./lib/api/currency-api-client";

export default function App() {
  const handleSheetChanges = useCallback((index: number) => {}, []);

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // exposed to Header via prop
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    getCurrencies("COP,USD");
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <GestureHandlerRootView>
        <LayoutScreen>
          <View className="flex-row items-center mt-3.5">
            <View className="flex-1" />
            <View className="flex-1 items-center">
              <CurrencySelector
                onPress={handlePresentModalPress}
                leftImage={{ uri: "https://flagsapi.com/US/flat/64.png" }}
                rightImage={{ uri: "https://flagsapi.com/CO/flat/64.png" }}
                fromCurrency="USD"
                toCurrency="COP"
              />
            </View>
            <View className="flex-1 items-end pr-3">
              <Pressable className="w-12 h-12 bg-white rounded-full items-center justify-center shadow">
                <Feather name="settings" size={24} color="black" />
              </Pressable>
            </View>
          </View>
          <CurrencyInputConversor
            currencyFrom={{
              countryCode: "US",
              currencyCode: "USD",
              currencyName: "United States Dollar",
            }}
            currencyTo={{
              countryCode: "CO",
              currencyCode: "COP",
              currencyName: "Colombian Peso",
            }}
          />

          <CurrencyHistoricalChart
            values={[
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ]}
          />
        </LayoutScreen>
        <CurrencySelectorBottomSheet
          bottomSheetModalRef={bottomSheetModalRef}
          handleSheetChanges={handleSheetChanges}
        />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
