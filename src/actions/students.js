import {
    IMPORT_STUDENTS_LOC,
    CLEAR_STUDENTS,
    GET_ALL_STUDENTS,
    DELETE_STUDENT,
} from './types';
import axios from 'axios';

//get students location
export const getStudentsLocation = () => async (dispatch) => {
    try {
        const res = await axios.get('/students/locations');

        dispatch({
            type: IMPORT_STUDENTS_LOC,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

//add one alumnus/alumna
export const addAlumni = (data) => async (dispatch) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    };
    console.log(data);

    try {
        const res = await axios.post('/admin/add-student', data, config);
        console.log(res);
    } catch (err) {
        console.log(err);
    }
};

//add one alumnus/alumna
export const editAlumni = (data) => async (dispatch) => {
    const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    };
    try {
        const res = await axios.put('/admin/edit-student', data, config);
        console.log(res);
    } catch (err) {
        console.log(err);
    }
};

export const deleteStudent = (studentId) => async (dispatch) => {
    if (
        window.confirm(
            'Are you sure you want to delete this alumnus/alumna? This action cannot be undone!'
        )
    ) {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        };
        console.log(studentId);

        try {
            const res = await axios.post(
                '/admin/delete-student',
                { studentId },
                config
            );

            console.log(res.data);

            dispatch({
                type: DELETE_STUDENT,
                payload: studentId,
            });
        } catch (err) {
            console.log(err.response);
        }
    }
};

//get all alumni
export const getAllStudents = () => async (dispatch) => {
    try {
        const res = await axios.get('/students');

        dispatch({
            type: GET_ALL_STUDENTS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

//clear students state
export const clearStudents = () => (dispatch) => {
    try {
        dispatch({
            type: CLEAR_STUDENTS,
        });
    } catch (err) {
        console.log(err);
    }
};
