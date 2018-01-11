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

export const getEvents = () => {
    return dispatch =>{
        let token = localStorage.getItem('recovery.com');
        
        fetch.getEvents(token, response => {
            dispatch({
                type: types.GET_EVENTS,
                events : response.data.res || []
            });
        });
    }
};