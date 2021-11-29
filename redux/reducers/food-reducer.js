import { NEXT_LOCATION, SET_ALL_MEALS, SET_MEALS, SET_ORDERS, PREVIOUS_LOCATION } from '../actions/food-action';

const INITIAL_STATE = {
  locationIndex: 0,
  meals: [],
  allMeals: [],
  orders: {}
};

export default foodReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ALL_MEALS:
      return {
        ...state,
        meals: action.payload[state.locationIndex],
        allMeals: action.payload,
      };
    case SET_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    case NEXT_LOCATION:
      let ind = (state.locationIndex + 1) % state.allMeals.length;
      return {
        ...state,
        locationIndex: ind,
        meals: state.allMeals[ind],
      };
    case PREVIOUS_LOCATION:
      ind = state.locationIndex - 1;
      if (ind < 0) {
        ind = state.allMeals.length - 1;
      }
      return {
        ...state,
        locationIndex: ind,
        meals: state.allMeals[ind],
      };
    default:
      return state;
  }
};
