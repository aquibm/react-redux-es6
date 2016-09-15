import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';

export class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, this.props.course),
            errors: {},
            isSaving: false
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.course.id != nextProps.course.id) {
            this.setState({
                course: Object.assign({}, nextProps.course)
            });
        }
    }

    updateCourseState(event) {
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;

        return this.setState({
            course: course
        });
    }

    saveCourse(event) {
        event.preventDefault(); // Stop the default form submit.

        if(!this.isFormValid()) {
            return;
        }

        this.setState({isSaving: true});

        this.props.actions.saveCourse(this.state.course).then(() => {
            this.redirect();
        }).catch((error) => {
            toastr.error(error);
            this.setState({isSaving: false});
        });
    }

    isFormValid() {
        let isValid = true;
        let errors = {};

        if(this.state.course.title.length < 5) {
            errors.title = 'Title must be at least 5 characters.';
            isValid = false;
        }

        this.setState({errors: errors});
        return isValid;
    }

    redirect() {
        toastr.success('Course saved');
        this.setState({isSaving: false});
        this.context.router.push('/courses');
    }

    render() {
        return (
            <CourseForm
                course={this.state.course}
                errors={this.state.errors}
                allAuthors={this.props.authors}
                onChange={this.updateCourseState}
                onSave={this.saveCourse}
                isSaving={this.state.isSaving} />
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

function getCourseById(courses, courseId) {
    const course = courses.filter(course => course.id === courseId);

    if(course) {
        return course[0];
    }

    return null;
}

function mapStateToProps(state, ownProps) {
    let course = {id: '', title: '', watchHref: '', authorId: '', length: '', category: ''};
    const courseId = ownProps.params.id; // /course/:id

    if(courseId && state.courses.length > 0) {
        course = getCourseById(state.courses, courseId);
    }

    const authorsForDropdown = state.authors.map(author => {
        return {
            value: author.id,
            text: `${author.firstName} ${author.lastName}`
        };
    });

    return {
        course: course,
        authors: authorsForDropdown
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);