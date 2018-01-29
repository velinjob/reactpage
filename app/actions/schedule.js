import * as types from '../utils/constants';
import fetch from '../utils/fetch';

export const getScheduleItems = () => {
    return dispatch =>{
    	let token = localStorage.getItem(types.PROJECT_NAME);
        fetch.getScheduleItems(token, response => {
            dispatch({
                type: types.GET_SCHEDULE_ITEMS,
                items : response.data.res
            });
        });
    }
}

export const handleForm = item => {
    return dispatch =>{
    	let token = localStorage.getItem(types.PROJECT_NAME);
        fetch.handleForm(token, item, response => {
            dispatch({
                type: types.GET_SCHEDULE_ITEMS,
                items : response.data.res
            });
        });
    }
}