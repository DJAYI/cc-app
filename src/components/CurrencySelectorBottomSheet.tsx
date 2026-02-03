import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useCallback, useReducer, useState } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CurrencyTabs } from "./CurrencyTabs";
import { CurrencySearchInput } from "./CurrencySearchInput";
import { CurrencyList } from "./CurrencyList";
import { currencyReducer, initialState } from "@/lib/utils/currencyReducer";

export function CurrencySelectorBottomSheet({
  bottomSheetModalRef,
  handleSheetChanges,
}) {
  const insets = useSafeAreaInsets();

  const [state, dispatch] = useReducer(currencyReducer, initialState);
  const { tabSelected, from, to } = state;

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  const [allCurrencies] = useState([
    { key: "1", currencyCode: "USD", currencyName: "United States Dollar" },
    { key: "2", currencyCode: "COP", currencyName: "Colombian Peso" },
    { key: "3", currencyCode: "EUR", currencyName: "Euro" },
    { key: "4", currencyCode: "JPY", currencyName: "Japanese Yen" },
    { key: "5", currencyCode: "GBP", currencyName: "British Pound Sterling" },
    { key: "6", currencyCode: "AUD", currencyName: "Australian Dollar" },
    { key: "7", currencyCode: "CAD", currencyName: "Canadian Dollar" },
    { key: "8", currencyCode: "CHF", currencyName: "Swiss Franc" },
  ]);

  const [filteredCurrencies, setFilteredCurrencies] = useState(allCurrencies);

  const handleSearch = (text: string) => {
    if (!text || text.length < 2) {
      setFilteredCurrencies(allCurrencies);
      return;
    }

    const query = text.toLowerCase();

    setFilteredCurrencies(
      allCurrencies.filter(
        (c) =>
          c.currencyCode.toLowerCase().includes(query) ||
          c.currencyName.toLowerCase().includes(query),
      ),
    );
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={["50%", "85%"]}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
        style={{ paddingBottom: insets.bottom }}
      >
        <View className="flex-1 px-5 pt-5 gap-6">
          <Text className="text-2xl font-bold ">
            Select currency to convert...
          </Text>
          <CurrencyTabs
            tabSelected={tabSelected}
            onTabChange={(tab) => dispatch({ type: "SET_TAB", payload: tab })}
          />

          <CurrencySearchInput onChange={handleSearch} />

          <View className="flex-1">
            <CurrencyList
              data={filteredCurrencies}
              tabSelected={tabSelected}
              from={from}
              to={to}
              onSelect={(currencyCode) =>
                dispatch({
                  type: "SET_CURRENCY",
                  payload: currencyCode,
                })
              }
            />
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
