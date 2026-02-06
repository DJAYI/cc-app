const currencyApiUrl = process.env.CURRENCY_API_URL;
const currencyApiKey = process.env.CURRENCY_API_KEY;



export const fetchCurrencyData = async (endpoint: string, params: Record<string, string>) => {

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

    return response.json();
}

export const getCurrencies = async (currencies) => {
    console.log(JSON.stringify(await fetchCurrencyData("currencies", { currencies })));
}