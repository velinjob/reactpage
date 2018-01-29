import * as types from '../utils/constants';
import fetch from '../utils/fetch';

export const getMembersList = () => {
    return dispatch =>{
    	let token = localStorage.getItem(types.PROJECT_NAME);

        fetch.getMembersList(token, response => {
            dispatch({
                type: types.GET_MEMBERS_LIST,
                members : response.data.res
            });
        });
    }
}