import { SET_MEALS, SET_ORDERS } from '../actions/food-action';

const INITIAL_STATE = {
    meals: [],
    orders: {
        carbs: {
            ytd: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
                datasets: [[12, 23, 21, 31, 23, 53, 24, 64, 32, 12, 42, 32]]
            },
            month: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
                datasets: [[12, 23, 21, 31, 23, 53, 24, 64, 32, 12, 42, 32]]
            },
            week: {
                labels: ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
                datasets: [[1, 2, 5, 0, 8, 4, 3]]
            },
            day: 40
        },
        sugars: {
            ytd: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
                datasets: [[12, 23, 21, 31, 23, 53, 24, 64, 32, 12, 42, 32], [2, 2, 2, 3, 3, 5, 4, 6, 2, 1, 4, 3]]
            },
            month: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
                datasets: [[12, 23, 21, 31, 23, 53, 24, 64, 32, 12, 42, 32], [2, 2, 2, 3, 3, 5, 4, 6, 2, 1, 4, 3]]
            },
            week: {
                labels: ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
                datasets: [[1, 2, 5, 0, 8, 4, 3], [2, 2, 2, 3, 3, 5, 9]]
            },
            day: 40
        },
        fats: {
            ytd: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
                datasets: [[12, 23, 21, 31, 23, 53, 24, 64, 32, 12, 42, 32], [2, 2, 2, 3, 3, 5, 4, 6, 2, 1, 4, 3]]
            },
            month: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
                datasets: [[12, 23, 21, 31, 23, 53, 24, 64, 32, 12, 42, 32], [2, 2, 2, 3, 3, 5, 4, 6, 2, 1, 4, 3]]
            },
            week: {
                labels: ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
                datasets: [[1, 2, 5, 0, 8, 4, 3], [2, 2, 2, 3, 3, 5, 9]]
            },
            day: 40
        },
        ironMG: {
            ytd: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
                datasets: [[12, 23, 21, 31, 23, 53, 24, 64, 32, 12, 42, 32]]
            },
            month: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
                datasets: [[12, 23, 21, 31, 23, 53, 24, 64, 32, 12, 42, 32]]
            },
            week: {
                labels: ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
                datasets: [[1, 2, 5, 0, 8, 4, 3]]
            },
            day: 40
        },
        protein: {
            ytd: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
                datasets: [[12, 23, 21, 31, 23, 53, 24, 64, 32, 12, 42, 32]]
            },
            month: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
                datasets: [[12, 23, 21, 31, 23, 53, 24, 64, 32, 12, 42, 32]]
            },
            week: {
                labels: ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
                datasets: [[1, 2, 5, 0, 8, 4, 3]]
            },
            day: 40
        },
        calories: {
            ytd: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
                datasets: [[12, 23, 21, 31, 23, 53, 24, 64, 32, 12, 42, 32]]
            },
            month: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
                datasets: [[12, 23, 21, 31, 23, 53, 24, 64, 32, 12, 42, 32]]
            },
            week: {
                labels: ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
                datasets: [[1, 2, 5, 0, 8, 4, 3]]
            },
            day: 40
        },

    }
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
            };
        default:
            return state;
    }
};
