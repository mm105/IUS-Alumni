import { combineReducers } from 'redux';
import students from './students';
import studentInfo from './studentInfo';
import auth from './auth';
import addAlumni from './addAlumni';
import alert from './alert';
import search from './search';

export default combineReducers({
    students,
    studentInfo,
    auth,
    addAlumni,
    alert,
    search,
});
