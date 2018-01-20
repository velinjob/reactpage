import * as types from '../utils/constants';

export default (state = {}, action) => {
    switch (action.type) {
        case types.GET_SCHEDULE_ITEMS:
            return Object.assign({}, state, {
                items : action.items
            });
    }
    return state;
};