import { GET_SEARCH_RESULTS } from './types';
import axios from 'axios';

//get single student info
export const getSearchResults = (text) => async (dispatch) => {
    try {
        const res = await axios.get(`/students/search/${text}`);

        console.log(res.data);

        dispatch({
            type: GET_SEARCH_RESULTS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err.response);
    }
};
