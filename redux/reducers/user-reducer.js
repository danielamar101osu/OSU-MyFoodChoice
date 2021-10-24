import { SET_LOCATION, SET_USER, UPDATE_USER, UPDATE_ALLERGY, UPDATE_RESTRICTION } from '../actions/user-action';

const INITIAL_STATE = {
    "location": {
        "latitude": 0,
        "latitudeDelta": 0.0922,
        "longitude": 0,
        "longitudeDelta": 0.0421,
    },

    "user": {
        "age": -1,
        "allergies": {
            "dairy": false,
            "eggs": false,
            "peanuts": false,
            "shellFish": false,
            "soy": false,
            "treeNuts": false,
            "wheat": false,
        },
        "buckIDCash": -1,
        "diningDollars": -1,
        "dotNumber": -1,
        "firstName": "",
        "height": -1,
        "lastName": "",
        "restrictions": {
            "beefFree": false,
            "kosher": false,
            "pescatarian": false,
            "porkFree": false,
            "vegan": false,
            "vegetarian": false,
        },
        "swipes": -1,
        "weight": -1,
    }
};

export default userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_LOCATION:
            return {
                ...state,
                location: action.payload
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case UPDATE_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            }
        case UPDATE_RESTRICTION:
            let temp = state;
            temp.user.restrictions[action.payload] = !state.user.restrictions[action.payload]
            return { ...temp }
        case UPDATE_ALLERGY:
            let temp1 = state;
            temp1.user.allergies[action.payload] = !state.user.allergies[action.payload]
            return { ...temp1 }
        default:
            return state
    }
};