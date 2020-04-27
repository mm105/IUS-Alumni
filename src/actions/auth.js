import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ADMIN_LOADED,
    AUTH_ERROR,
    CLEAR_AUTH,
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

export const loadAdmin = () => async (dispatch) => {
    if (localStorage.token) {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + localStorage.token;
        try {
            console.log('before');
            const res = await axios.get('/admin/load');
            console.log('after');

            dispatch({
                type: ADMIN_LOADED,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
            });
        }
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const login = (email, password) => async (dispatch) => {
    try {
        const res = await axios.post('/admin/login', {
            email: email,
            password: password,
        });

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err.response);

        const errors = err.response.data.message;
        dispatch(setAlert(errors, 'danger'));
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

export const changePassword = (data) => async (dispatch) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    };

    try {
        const res = await axios.post('/admin/change-password', data, config);
        console.log(res.data);
        dispatch(setAlert(res.data.message, 'success'));
    } catch (err) {
        console.log(err.response.data);
        dispatch(setAlert(err.response.data.message, 'danger'));
    }
};

export const logout = () => (dispatch) => {
    try {
        dispatch({
            type: LOGOUT,
        });
    } catch (err) {
        console.log(err);
    }
};

//clear auth (reset loading to true)
export const clearAuth = () => (dispatch) => {
    try {
        dispatch({
            type: CLEAR_AUTH,
        });
    } catch (err) {
        console.log(err);
    }
};
