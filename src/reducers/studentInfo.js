import { IMPORT_STUDENT_INFO, CLEAR_STUDENT_INFO } from '../actions/types';

const initialState = {
    studentInfo: null,
    infoLoading: true,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case IMPORT_STUDENT_INFO:
            return {
                ...state,
                studentInfo: payload,
                infoLoading: false,
            };
        case CLEAR_STUDENT_INFO:
            return {
                ...state,
                studentInfo: null,
                infoLoading: true,
            };

        default:
            return state;
    }
}
