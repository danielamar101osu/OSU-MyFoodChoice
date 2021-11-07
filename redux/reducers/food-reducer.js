import { SET_MEALS, SET_ORDERS } from '../actions/food-action';

const INITIAL_STATE = {
    meals: [],
    orders: []
};

export default foodReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_MEALS:
            return {
                ...state,
                meals: action.payload
            };
        case SET_ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        default:
            return state
    }
};
