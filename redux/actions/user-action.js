export const SET_LOCATION = "SET_LOCATION"
export const SET_USER = "SET_USER"
export const UPDATE_USER = "UPDATE_USER"
export const UPDATE_ALLERGY = "UPDATE_ALLERGY"
export const UPDATE_RESTRICTION = "UPDATE_RESTRICTION"

export const updateLocation = location => (
    {
        type: SET_LOCATION,
        payload: location,
    }
);
export const setUser = user => (
    {
        type: SET_USER,
        payload: user,
    }
);
export const updateUser = user => (
    {
        type: UPDATE_USER,
        payload: user,
    }
);
export const updateAllergy = allergy => (
    {
        type: UPDATE_ALLERGY,
        payload: allergy,
    }
);
export const updateRestriction = restriction => (
    {
        type: UPDATE_RESTRICTION,
        payload: restriction,
    }
);