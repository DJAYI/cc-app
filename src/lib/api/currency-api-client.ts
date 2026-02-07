const currencyApiUrl = process.env.EXPO_PUBLIC_CURRENCY_API_URL;
const currencyApiKey = process.env.EXPO_PUBLIC_CURRENCY_API_KEY;


export interface Currencies {
    data: { [key: string]: data };
}

export interface data {
    symbol: string;
    name: string;
    symbol_native: string;
    decimal_digits: number;
    rounding: number;
    code: string;
    name_plural: string;
    type: string;
    countries: string[];
}

export interface LatestRate {
    meta: Meta;
    data: Data;
}

export interface Data {
    [key: string]: CurrencyRate;
}

export interface CurrencyRate {
    code: string;
    value: number;
}

export interface Meta {
    last_updated_at: Date;
}




export const fetchCurrencyData = async <T>(endpoint: string, params: Record<string, string>): Promise<T> => {

    const response = await fetch(`${currencyApiUrl}/${endpoint}?${new URLSearchParams(params).toString()}`, {
        method: "GET",
        headers: {
            apiKey: currencyApiKey || "",
            "Content-Type": "application/json"
        }
    })

    if (!response.ok) {
        throw new Error(`Error fetching currency data: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
}

export const getCurrencies = async (currencies?: string[]): Promise<Currencies> => {
    const params: Record<string, string> = {};
    if (currencies) {
        params.currencies = currencies.join(",");
    }

    const data = await fetchCurrencyData<Currencies>("currencies", params);
    return data;
}

export const getLatestRates = async (base: string, currencies?: string[]): Promise<LatestRate> => {
    const params: Record<string, string> = { base };
    if (currencies) {
        params.currencies = currencies.join(",");
    }

    const data = await fetchCurrencyData<LatestRate>("latest", params);
    return data;
}