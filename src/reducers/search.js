import { GET_SEARCH_RESULTS } from '../actions/types';

const initialState = {
    results: {},
    loading: true,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_SEARCH_RESULTS:
            return {
                results: payload,
                loading: false,
            };
        default:
            return state;
    }
}
