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
        dispatch(userRequestAC());
        getUserInfo().then(res => {
            dispatch(userSuccessRequestAC(res.user.name, res.user.email))
        }).catch(() => {
            dispatch(updateToken())
            dispatch(userFailedRequestAC())
        });
    };
}

export function userLogout(redirect) {
    return function(dispatch) {
        dispatch(userRequestAC());
        postUserLogout().then(() => {
            deleteCookie('token')
        }).then(() => deleteCookie('refreshToken')
        ).then(() => dispatch(clearUserDataAC())
        ).then(() => redirect()
        ).catch(() => dispatch(userFailedRequestAC()));
    };
}

export function updateToken() {
    return function(dispatch) {
        dispatch(userRequestAC());
        postUpdateToken().then(res => {
            const authToken = res.accessToken.split('Bearer ')[1];
            if (authToken) {
                setCookie('token', authToken)
                setCookie('refreshToken', res.refreshToken);
            }
        }).catch(() => dispatch(userFailedRequestAC()));
    };
}

export function setUserData(name, email, password) {
    return function(dispatch) {
        dispatch(userRequestAC());
        editUserInfo(name, email, password).then().catch(() => dispatch(userFailedRequestAC()));
    };
}

function userRequestAC() {
    return { type: USER_REQUEST }
}

function userSuccessRequestAC(name, email) {
    return { 
        type: USER_SUCCESS, 
        payload: {
            name: name,
            email: email,
        }
    }
}

function userFailedRequestAC() {
    return { type: USER_FAILED }
}

function clearUserDataAC() {
    return { type: CLEAR_USER_DATA }
}