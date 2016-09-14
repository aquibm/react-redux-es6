import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import CourseFrom from './CourseForm';

function setup(isSaving) {
    const props = {
        course: {},
        isSaving,
        errors: {},
        onSave: () => {},
        onChange: () => {}
    };

    return shallow(<CourseFrom {...props} />);
}

describe('CourseForm tests', () => {
    it('should render a form and a h1', () => {
        const wrapper = setup(false);

        expect(wrapper.find('form').length).toBe(1);
        expect(wrapper.find('h1').text()).toEqual('Manage Course');
    });

    it('should label the save button as "Save" when not saving', () => {
        const wrapper = setup(false);

        expect(wrapper.find('input[type="submit"]').props().value).toBe('Save');
    });

    it('should label the save button as "Saving..." when saving', () => {
        const wrapper = setup(true);

        expect(wrapper.find('input[type="submit"]').props().value).toBe('Saving...');
    });
});