import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ADMIN_LOADED,
    AUTH_ERROR,
} from '../actions/types';

const initialState = {
    isAuthenticated: null,
    loading: true,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADMIN_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case LOGIN_FAIL:
        case LOGOUT:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
            };
        default:
            return state;
    }
}
