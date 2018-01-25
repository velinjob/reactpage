import * as types from '../utils/constants';

export default (state = {}, action) => {
    switch (action.type) {
        case types.GET_MEMBERS_LIST:
            return Object.assign({}, state, {
                members : action.members
            });
    }
    return state;
};