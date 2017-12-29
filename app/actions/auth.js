import * as types from '../utils/constants';
import fetch from '../utils/fetch';

export const openAuthModalToSignIn = () => {
    return {
        type: types.OPEN_AUTH_MODAL_TO_SIGNIN,
        openSignInModal : true,
        openSignUpModal : false,
        error : false
    }
};

export const openAuthModalToSignUp = () => {
    return {
        type: types.OPEN_AUTH_MODAL_TO_SIGNUP,
        openSignUpModal : true,
        openSignInModal : false,
        error : false
    }
};

export const closeAuthModal = () => {
    return {
        type: types.CLOSE_AUTH_MODAL,
        openSignUpModal : false,
        openSignInModal : false,
        error : false
    }
};

export const auth = (type, login, password) => {
    return dispatch =>{
        fetch.auth(type, login, password, response => {

            if(response.data.res.error){
                dispatch({
                    type: types.AUTH,
                    loggedIn : false,
                    error : response.data.res.error
                });
            }
            else if(response.data.res.token){
                dispatch(closeAuthModal());

                localStorage.setItem(types.PROJECT_NAME, response.data.res.token);

                dispatch({
                    type: types.AUTH,
                    loggedIn : true,
                    error : false
                });
            }
        });
    }
};

export const handleSpinner = (value)=>{
    return {
        type : types.HANDLE_SPINNER,
        toSpin : value
    }
};

export const checkAuth = () => {
    return dispatch =>{
        let token = localStorage.getItem(types.PROJECT_NAME);
        
        if(token) {
            dispatch(handleSpinner(true));

            fetch.checkAuth(token, response => {
                dispatch(handleSpinner(false));

                dispatch({
                    type: types.AUTH,
                    loggedIn : response.data.res
                });
            });
        }
        else {
            dispatch({
                type: types.AUTH,
                loggedIn : false
            });
        }
    }
};

export const signOut = () => {
    return dispatch => {
        localStorage.removeItem(types.PROJECT_NAME);

        dispatch({
            type: types.SIGN_OUT,
            loggedIn : false
        });
    }
};