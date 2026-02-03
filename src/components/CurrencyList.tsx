import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useCallback } from "react";
import { CurrencyItem } from "./CurrencyItem";

export function CurrencyList({ data, tabSelected, from, to, onSelect }) {
  const renderItem = useCallback(
    ({ item }) => {
      const isSelected =
        tabSelected === "from"
          ? from === item.currencyCode
          : to === item.currencyCode;

      const isDisabled =
        tabSelected === "from"
          ? to === item.currencyCode
          : from === item.currencyCode;

      return (
        <CurrencyItem
          item={item}
          isSelected={isSelected}
          isDisabled={isDisabled}
          onPress={() => onSelect(item.currencyCode)}
        />
      );
    },
    [tabSelected, from, to, onSelect],
  );

  return (
    <BottomSheetFlatList
      data={data}
      keyExtractor={(i) => i.key}
      renderItem={renderItem}
    />
  );
}
