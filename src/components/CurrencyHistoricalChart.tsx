import { useEffect, useRef, useState } from "react";
import { View, Pressable, Dimensions, Text, Animated } from "react-native";
import { LineChart } from "react-native-chart-kit";

interface CurrencyHistoricalChartProps {
  values: number[];
  dates?: string[];
}

export function CurrencyHistoricalChart({
  values,
}: CurrencyHistoricalChartProps) {
  const dates = ["1D", "1W", "1M", "1Y"];
  const [selectedDate, setSelectedDate] = useState("1W");
  const formatDate = (d: Date) =>
    d
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      .replace(",", "");

  const getFromDate = (range: string) => {
    const now = new Date();
    const offsets: Record<string, number> = {
      "1D": 1,
      "1W": 7,
      "1M": 30,
      "1Y": 365,
    };
    return new Date(
      now.getTime() - (offsets[range] || 30) * 24 * 60 * 60 * 1000,
    );
  };

  const getLabels = (range: string) => [
    `${formatDate(getFromDate(range))}`,
    `${formatDate(new Date())}`,
  ];

  const valuesByDate = {
    "1D": [20, 45, 28, 80, 99],
    "1W": [30, 50, 40, 60, 70, 90, 100],
    "1M": [25, 35, 45, 55],
    "1Y": [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
  };

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <View className="p-4 bg-white rounded-3xl">
      <CurrencyHistoricalHeader
        dates={dates}
        selectedDate={selectedDate}
        handleSelectDate={handleSelectDate}
      />
      <CurrencyChartHistorical
        values={valuesByDate[selectedDate]}
        labels={getLabels(selectedDate)}
      />
    </View>
  );
}

function CurrencyChartHistorical({ values, labels }) {
  return (
    <LineChart
      data={{
        labels: labels,
        datasets: [
          {
            data: values,
          },
        ],
      }}
      width={Dimensions.get("window").width - 60} // from react-native
      height={220}
      yAxisLabel="$"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: "#fff",
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#000000",
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
}

function CurrencyHistoricalHeader({ dates, selectedDate, handleSelectDate }) {
  return (
    <View className="flex flex-row justify-between items-center mb-4">
      <Text className="text-black font-semibold text-lg">Historical</Text>

      <HistoricalDateSelector
        dates={dates}
        selectedDate={selectedDate}
        handleSelectDate={handleSelectDate}
      />
    </View>
  );
}

function HistoricalDateSelector({ dates, selectedDate, handleSelectDate }) {
  const [buttonLayouts, setButtonLayouts] = useState<
    Record<string, { x: number; width: number }>
  >({});

  const animatedLeft = useRef(new Animated.Value(0)).current;
  const animatedWidth = useRef(new Animated.Value(0)).current;

  const handleButtonLayout = (
    date: string,
    event: { nativeEvent: { layout: { x: number; width: number } } },
  ) => {
    const { x, width } = event.nativeEvent.layout;
    setButtonLayouts((prev) => ({
      ...prev,
      [date]: { x, width },
    }));
  };

  useEffect(() => {
    const layout = buttonLayouts[selectedDate];
    if (layout) {
      Animated.spring(animatedLeft, {
        toValue: layout.x,
        useNativeDriver: false,
      }).start();
      Animated.spring(animatedWidth, {
        toValue: layout.width,
        useNativeDriver: false,
      }).start();
    }
  }, [selectedDate, buttonLayouts, animatedLeft, animatedWidth]);

  return (
    <View className="bg-gray-100 rounded-lg p-2 flex flex-row items-center gap-2.5 relative">
      {dates.map((date) => (
        <Pressable
          key={date}
          className="px-2 py-1 z-20"
          onPress={() => handleSelectDate(date)}
          onLayout={(event) => handleButtonLayout(date, event)}
        >
          <Text
            className={`font-semibold ${
              selectedDate === date ? "text-black" : "text-gray-500"
            }`}
          >
            {date}
          </Text>
        </Pressable>
      ))}

      <Animated.View
        style={{
          position: "absolute",
          top: 5,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          left: animatedLeft,
          width: animatedWidth,
          height: 32,
          backgroundColor: "white",
          borderRadius: 8,
          zIndex: 10,
        }}
      />
    </View>
  );
}
