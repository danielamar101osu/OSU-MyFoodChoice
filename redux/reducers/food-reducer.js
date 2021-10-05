import { combineReducers } from 'redux';
import { SET_MEALS } from '../actions/food-action';

const INITIAL_STATE = {
    meals: [],
    snacks: [],
    other: []
};

export default foodReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_MEALS:
            return {
                ...state,
                meals: action.payload
            }
        default:
            return state
    }
};
