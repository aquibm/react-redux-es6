import { combineReducers } from 'redux';
import courses from './courseReducer';

const rootReducer = combineReducers({
    courses // Influences this.state.courses
});

export default rootReducer;