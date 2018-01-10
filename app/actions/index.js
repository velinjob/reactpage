import * as types from '../utils/constants';
import fetch from '../utils/fetch';

export const getPages = () => {
    return dispatch =>{
        fetch.getPages(response => {
            dispatch({
                type: types.GET_PAGES,
                pages : response.data.pages || []
            });
        });
    }
};

export const getTestContent = () => {
    return dispatch =>{
        fetch.getTestContent(response => {
            dispatch({
                type: types.GET_TEST_CONTENT,
                testContent : response.data.res
            });
        });
    }
}