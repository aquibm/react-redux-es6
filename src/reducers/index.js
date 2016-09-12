import { combineReducers } from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';

const rootReducer = combineReducers({
    courses, // Influences this.state.courses
    authors
});

export default rootReducer;