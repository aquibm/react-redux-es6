import * as actionTypes from './actionTypes';
import AuthorApi from '../api/mockAuthorApi';
import * as ajaxActions from './ajaxStatusActions';

export function loadAuthorsSuccess(authors) {
    return {
        type: actionTypes.LOAD_AUTHORS_SUCCESS,
        authors
    };
}

// Thunks

export function loadAuthors() {
    return (dispatch) => {
        dispatch(ajaxActions.beginAjaxCall());

        return AuthorApi.getAllAuthors().then((authors) => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch((error) => {
            dispatch(ajaxActions.ajaxCallError());
            throw error;
        });
    };
}