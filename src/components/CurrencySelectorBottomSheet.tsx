import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { RefObject, useCallback, useEffect, useReducer, useState } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CurrencyTabs } from "./CurrencyTabs";
import { CurrencySearchInput } from "./CurrencySearchInput";
import { CurrencyList } from "./CurrencyList";
import { currencyReducer, initialState } from "@/lib/utils/currencyReducer";
import {
  Currencies,
  Datum,
  getCurrencies,
} from "@/lib/api/currency-api-client";

interface CurrencySelectorBottomSheetProps {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
  handleSheetChanges: (index: number) => void;
}

export function CurrencySelectorBottomSheet({
  bottomSheetModalRef,
  handleSheetChanges,
}: CurrencySelectorBottomSheetProps) {
  const insets = useSafeAreaInsets();

  const [state, dispatch] = useReducer(currencyReducer, initialState);
  const { tabSelected, from, to } = state;

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  const [allCurrencies, setAllCurrencies] = useState<Datum[]>([]);

  const [filteredCurrencies, setFilteredCurrencies] = useState<Datum[]>([]);

  const handleSearch = (text: string) => {
    if (!text || text.length < 2) {
      setFilteredCurrencies(allCurrencies);
      return;
    }

    const query = text.toLowerCase();

    setFilteredCurrencies(
      allCurrencies.filter(
        (currency) =>
          currency.code.toLowerCase().includes(query) ||
          currency.name.toLowerCase().includes(query),
      ),
    );
  };

  useEffect(() => {
    getCurrencies()
      .then((data) => {
        const formattedCurrencies = data.data ? Object.values(data.data) : [];

        setAllCurrencies(formattedCurrencies);
        setFilteredCurrencies(formattedCurrencies);
      })
      .catch((error) => console.error("Error fetching currencies:", error));
  }, []);

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
            onTabChange={(tab: "from" | "to") =>
              dispatch({ type: "SET_TAB", payload: tab })
            }
          />

          <CurrencySearchInput onChange={handleSearch} />

          <View className="flex-1">
            <CurrencyList
              data={filteredCurrencies}
              tabSelected={tabSelected}
              from={from!}
              to={to!}
              onSelect={(currencyCode: string) =>
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
