import * as types from '../utils/constants';
import fetch from '../utils/fetch';

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