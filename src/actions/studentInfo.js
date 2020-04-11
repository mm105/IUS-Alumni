import { IMPORT_STUDENT_INFO, CLEAR_STUDENT_INFO } from './types';
import axios from 'axios';

//get single student info
export const getStudentInfo = (studentId) => async (dispatch) => {
    try {
        const res = await axios.get(`/student/${studentId}`);

        dispatch({
            type: IMPORT_STUDENT_INFO,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

//clear student info
export const clearStudentInfo = () => (dispatch) => {
    try {
        dispatch({
            type: CLEAR_STUDENT_INFO,
        });
    } catch (err) {
        console.log(err);
    }
};
