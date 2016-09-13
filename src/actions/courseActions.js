import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import * as ajaxActions from './ajaxStatusActions';

export function loadCoursesSuccess(courses) {
    return {
        type: types.LOAD_COURSES_SUCCESS,
        courses
    };
}

export function updateCourseSuccess(course) {
    return {
        type: types.UPDATE_COURSE_SUCCESS,
        course
    };
}

export function createCourseSuccess(course) {
    return {
        type: types.CREATE_COURSE_SUCCESS,
        course
    };
}

// Thunks

export function loadCourses() {
    return (dispatch) => {
        dispatch(ajaxActions.beginAjaxCall());

        return courseApi.getAllCourses().then((courses) => {
            dispatch(loadCoursesSuccess(courses));
        }).catch((error) => {
            throw error;
        });
    };
}

export function saveCourse(course) {
    return (dispatch) => {
        dispatch(ajaxActions.beginAjaxCall());

        return courseApi.saveCourse(course).then(savedCourse => {
            if(course.id) {
                dispatch(updateCourseSuccess(savedCourse));
            } else {
                dispatch(createCourseSuccess(savedCourse));
            }
        }).catch(error => {
            dispatch(ajaxActions.ajaxCallError());
            throw error;
        });
    };
}