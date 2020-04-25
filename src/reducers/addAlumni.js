import { UPDATE_CITY_VALUE } from '../actions/types';

const initialState = {
    valueOfCity: ' ',
    loading: true,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_CITY_VALUE:
            return {
                ...state,
                valueOfCity: payload,
                loading: false,
            };
        default:
            return state;
    }
}
