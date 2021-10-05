import { combineReducers } from 'redux';
import { SET_LOCATION } from '../actions/user-action';

const INITIAL_STATE = {
    firstName: 'Luke',
    lastName: 'Petersen',
    age: 21,
    weight: 165,
    height: "5'9",
    dotNumber: 203,
    diningDollars: 734.12,
    buckIDCash: 82.34,
    swipes: 9,
    allergies: {
        eggs: { name: 'Eggs', value: false },
        shellfish: { name: 'Shellfish', value: false },
        fish: { name: 'Fish', value: false },
        peanuts: { name: 'Peanuts', value: true },
        treenuts: { name: 'Tree Nuts', value: true },
        soy: { name: 'Soy', value: false },
        wheat: { name: 'Wheat', value: false },
    },
    restrictions: {
        gluten: { name: 'Gluten Free', value: false },
        vegetarian: { name: 'Vegetarian', value: false },
        vegan: { name: 'Vegan', value: false },
        dairy: { name: 'Dairy Free', value: false },
    },
    location: {
        longitude: 0,
        latitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }
};

export default userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_LOCATION:
            return {
                ...state,
                location: action.payload
            }
        default:
            return state
    }
};