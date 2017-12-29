import * as types from '../utils/constants';

export default (state = {}, action) => {
    switch (action.type) {
        case types.GET_PAGES:
            return Object.assign({}, state, {
                pages : action.pages
            });
    }
    return state;
};