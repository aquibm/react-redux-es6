import { combineReducers } from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import numAjaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    courses, // Influences this.state.courses
    authors,
    numAjaxCallsInProgress
});

export default rootReducer;