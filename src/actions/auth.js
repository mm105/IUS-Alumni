import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ADMIN_LOADED,
    AUTH_ERROR,
} from './types';
import axios from 'axios';

export const loadAdmin = () => async (dispatch) => {
    if (localStorage.token) {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + localStorage.token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }

    try {
        const res = await axios.get('/admin/load');

        dispatch({
            type: ADMIN_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
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
        console.log(err);

        //const errors = err.response.data.message;
        // dispatch(setAlert(errors, 'danger'));
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
    } catch (err) {
        console.log(err);
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
