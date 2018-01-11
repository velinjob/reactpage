import { combineReducers } from 'redux';
import auth from './auth';
import main from './main';
import test from './test';

export default combineReducers({
    auth,
    main,
    test
});