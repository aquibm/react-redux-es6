import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {ManageCoursePage} from './ManageCoursePage';

describe('ManageCoursePage tests', () => {
    it('sets an error message when trying to save with an empty title', () => {
        const props = {
            authors: [],
            course: {id: '', title: '', watchHref: '', authorId: '', length: '', category: ''},
            actions: {
                saveCourse: () => { return Promise.resolve(); }
            }
        };
        const wrapper = mount(<ManageCoursePage {...props} />);
        const saveButton = wrapper.find('input[type="submit"]');

        saveButton.simulate('click');
        expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
    });
});