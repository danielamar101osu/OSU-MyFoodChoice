export const SET_LOCATION = "SET_LOCATION"

export const updateLocation = location => (
    {
        type: SET_LOCATION,
        payload: location,
    }
);