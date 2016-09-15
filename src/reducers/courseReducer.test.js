import expect from 'expect';
import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

describe('Course Reducer tests', () => {
    it('should add course when passed CREATE_COURSE_SUCCESS', () => {
        const initialState = [
            {title: 'A'}, {title: 'B'}
        ];
        const newCourse = {title: 'C'};
        const action = actions.createCourseSuccess(newCourse);

        const newState = courseReducer(initialState, action);

        expect(newState.length).toBe(3);
        expect(newState[0].title).toBe('A');
        expect(newState[1].title).toBe('B');
        expect(newState[2].title).toBe('C');
    });

    it('should update course when passed UPDATE_COURSE_SUCCESS', () => {
        const initialState = [
            {id: 'A', title: 'Course A'},
            {id: 'B', title: 'Course B'},
            {id: 'C', title: 'Course C'}
        ];
        const course = {id: 'B', title: 'Beta'};
        const action = actions.updateCourseSuccess(course);

        const newState = courseReducer(initialState, action);
        const updatedCourse = newState.find(crs => crs.id === course.id);

        expect(newState.length).toBe(3);
        expect(updatedCourse.title).toBe('Beta');
    });

    it('should return the initialState if the action is not implemented', () => {
        const initialState = [
            {title: 'Course A'}, {title: 'Course B'}
        ];

        const newState = courseReducer(initialState, {
            type: 'DOES_NOT_EXIST'
        });

        expect(newState).toEqual(initialState);
    });

    it('should throw if called without an action', () => {
        const initialState = [
            {title: 'Some Course'}
        ];

        expect(() => {
            courseReducer(initialState);
        }).toThrow();
    });
});