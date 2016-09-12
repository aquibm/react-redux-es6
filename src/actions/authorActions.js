import * as actionTypes from './actionTypes';
import AuthorApi from '../api/mockAuthorApi';

export function loadAuthorsSuccess(authors) {
    return {
        type: actionTypes.LOAD_AUTHORS_SUCCESS,
        authors
    };
}

// Thunks

export function loadAuthors() {
    return (dispatch) => {
        return AuthorApi.getAllAuthors().then((authors) => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch((error) => {
            throw error;
        });
    };
}