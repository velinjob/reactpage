import * as types from '../utils/constants';

export default (state = {}, action) => {
    switch (action.type) {
        case types.GET_TEST_CONTENT:
            return Object.assign({}, state, {
                testContent : action.testContent
            });
    }
    return state;
};