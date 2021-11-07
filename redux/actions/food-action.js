export const SET_MEALS = "SET_MEALS";
export const SET_ORDERS = "SET_ORDERS";

export const setMeals = meals => (
    {
        type: SET_MEALS,
        payload: meals,
    }
);

export const setOrderHistory = orders => (
    {
        type: SET_ORDERS,
        payload: orders,
    }
);