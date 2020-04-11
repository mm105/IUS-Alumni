import {
    IMPORT_STUDENTS_LOC,
    CLEAR_STUDENTS,
    GET_ALL_STUDENTS,
} from '../actions/types';

const initialState = {
    students: [],
    studentsLoc: [],
    loading: true,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case IMPORT_STUDENTS_LOC:
            return {
                ...state,
                studentsLoc: payload,
                loading: false,
            };
        case GET_ALL_STUDENTS:
            return {
                ...state,
                students: payload,
                loading: false,
            };
        case CLEAR_STUDENTS:
            return {
                students: [],
                studentsLoc: [],
                loading: true,
            };
        default:
            return state;
    }
}
