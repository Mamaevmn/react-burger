import { editUserInfo, getUserInfo, postUpdateToken, postUserLogout } from "../../utils/api";
import { deleteCookie, setCookie } from "../../utils/cookie";

export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_USER_NAME_VALUE = 'SET_USER_NAME_VALUE';
export const SET_USER_EMAIL_VALUE = 'SET_USER_EMAIL_VALUE';
export const SET_USER_PASSWORD_VALUE = 'SET_USER_PASSWORD_VALUE';

export const CLEAR_USER_CHANGING = 'CLEAR_USER_CHANGING';
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILED = 'USER_FAILED';

export function getUser() {
    return function(dispatch) {
        dispatch({
            type: USER_REQUEST
        });
        getUserInfo().then(res => {
            if (res && res.success) {
                dispatch({ 
                    type: USER_SUCCESS, 
                    payload: {
                        name: res.user.name,
                        email: res.user.email,
                }})
            } else {
                dispatch({
                    type: USER_FAILED
                });
                dispatch(updateToken())
            }
        }).catch(e => {
            dispatch({
                type: USER_FAILED
            });
        });
    };
}

export function userLogout() {
    return function(dispatch) {
        dispatch({
            type: USER_REQUEST
        });
        postUserLogout().then(res => {
            if (res && res.success) {
                deleteCookie('token')
                deleteCookie('refreshToken')
                dispatch({ type: CLEAR_USER_DATA })
            } else {
                dispatch({
                    type: USER_FAILED
                });
            }
        }).catch(e => {
            dispatch({
                type: USER_FAILED
            });
        });
    };
}

export function updateToken() {
    return function(dispatch) {
        dispatch({
            type: USER_REQUEST
        });
        postUpdateToken().then(res => {
            if (res && res.success) {
                const authToken = res.accessToken.split('Bearer ')[1];

                if (authToken) {
                    setCookie('token', authToken);
                }
            } else {
                dispatch({
                    type: USER_FAILED
                });
            }
        }).catch(e => {
            dispatch({
                type: USER_FAILED
            });
        });
    };
}

export function setUserData() {
    return function(dispatch) {
        dispatch({
            type: USER_REQUEST
        });
        editUserInfo().then(res => {
            console.log(res);
        }).catch(e => {
            dispatch({
                type: USER_FAILED
            });
        });
    };
}