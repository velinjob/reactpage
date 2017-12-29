import * as types from '../utils/constants';
import utils from '../utils/fetch';


export const getPages = () => {
    return dispatch =>{
        utils.getPages(response => {
            console.log(response);
            
            if(response.data.pages){
                dispatch({
                    type: types.GET_PAGES,
                    pages : response.data.pages
                });
            }
        });
    }
};