import * as types from '../utils/constants';
import fetch from '../utils/fetch';

export const getInitContent = () => {
    return dispatch =>{
        let token = localStorage.getItem(types.PROJECT_NAME);
        fetch.getInitContent(token, response => {
            dispatch({
                type: types.GET_PAGES,
                pages : response.data.pages || []
            });
        });
    }
};

export const getEvents = () => {
    return dispatch =>{
        let token = localStorage.getItem(types.PROJECT_NAME);
        
        fetch.getEvents(token, response => {
            dispatch({
                type: types.GET_EVENTS,
                events : response.data.res || []
            });
        });
    }
};