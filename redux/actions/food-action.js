export const SET_MEALS = "SET_MEALS"

export const setMeals = meals => (
    {
        type: SET_MEALS,
        payload: meals,
    }
);