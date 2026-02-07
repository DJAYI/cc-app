import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useCallback } from "react";
import { CurrencyItem } from "./CurrencyItem";
import { Datum } from "@/lib/api/currency-api-client";

interface CurrencyListProps {
  data: Datum[];
  tabSelected: "from" | "to";
  from?: string;
  to?: string;
  onSelect: (currencyCode: string) => void;
}

interface CurrencyListItem {
  key: string;
  code: string;
  name: string;
  countryCode: string;
}

export function CurrencyList({
  data,
  tabSelected,
  from,
  to,
  onSelect,
}: CurrencyListProps) {
  const renderItem = useCallback(
    ({ item }: { item: CurrencyListItem }) => {
      const isSelected =
        tabSelected === "from" ? from === item.code : to === item.code;

      const isDisabled =
        tabSelected === "from" ? to === item.code : from === item.code;

      const currencyData = data.find((d) => d.code === item.code);

      return (
        <CurrencyItem
          item={{ ...item, countryCode: currencyData?.countries[0] ?? "" }}
          isSelected={isSelected}
          isDisabled={isDisabled}
          onPress={() => onSelect(item.code)}
        />
      );
    },
    [tabSelected, from, to, onSelect, data],
  );

  return (
    <BottomSheetFlatList
      data={data.map((d) => ({ ...d, countryCode: d.countries[0] ?? "" }))}
      keyExtractor={(i: Datum) => i.code}
      renderItem={renderItem}
    />
  );
}
