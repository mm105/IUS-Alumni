import { combineReducers } from 'redux';
import students from './students';
import studentInfo from './studentInfo';
import auth from './auth';

export default combineReducers({
    students,
    studentInfo,
    auth,
});
