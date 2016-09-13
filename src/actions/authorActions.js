import * as actionTypes from './actionTypes';
import AuthorApi from '../api/mockAuthorApi';
import { beginAjaxCall } from './ajaxStatusActions';

export function loadAuthorsSuccess(authors) {
    return {
        type: actionTypes.LOAD_AUTHORS_SUCCESS,
        authors
    };
}

// Thunks

export function loadAuthors() {
    return (dispatch) => {
        dispatch(beginAjaxCall());

        return AuthorApi.getAllAuthors().then((authors) => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch((error) => {
            throw error;
        });
    };
}