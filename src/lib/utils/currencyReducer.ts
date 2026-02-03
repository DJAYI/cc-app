export type Tab = "from" | "to";

export type CurrencyState = {
    tabSelected: Tab;
    from: string | null;
    to: string | null;
};

export const initialState: CurrencyState = {
    tabSelected: "from",
    from: "USD",
    to: "COP",
};

export function currencyReducer(state: CurrencyState, action: any): CurrencyState {
    switch (action.type) {
        case "SET_TAB":
            return { ...state, tabSelected: action.payload };

        case "SET_CURRENCY": {
            const otherTab = state.tabSelected === "from" ? "to" : "from";
            if (state[otherTab] === action.payload) return state;

            return {
                ...state,
                [state.tabSelected]: action.payload,
            };
        }

        default:
            return state;
    }
}
