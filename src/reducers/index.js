import { combineReducers } from 'redux';
import students from './students';
import studentInfo from './studentInfo';
import auth from './auth';
import addAlumni from './addAlumni';
import alert from './alert';

export default combineReducers({
    students,
    studentInfo,
    auth,
    addAlumni,
    alert,
});
