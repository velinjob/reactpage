import { combineReducers } from 'redux';
import auth from './auth';
import main from './main';
import test from './test';
import schedule from './schedule';

export default combineReducers({
    auth,
    main,
    test,
    schedule
});