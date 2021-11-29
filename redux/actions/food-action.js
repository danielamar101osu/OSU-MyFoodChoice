export const SET_MEALS = 'SET_MEALS';
export const SET_ORDERS = 'SET_ORDERS';
export const NEXT_LOCATION = 'NEXT_LOCATION';
export const PREVIOUS_LOCATION = 'PREVIOUS_LOCATION';
export const SET_ALL_MEALS = 'SET_ALL_MEALS';

export const setAllMeals = (meals) => ({
  type: SET_ALL_MEALS,
  payload: meals,
});

export const setOrderHistory = (orders) => ({
  type: SET_ORDERS,
  payload: orders,
});
export const nextLocation = () => ({
  type: NEXT_LOCATION,
});
export const previousLocation = () => ({
  type: PREVIOUS_LOCATION,
});
