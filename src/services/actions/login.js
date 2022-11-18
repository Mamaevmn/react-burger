import { postUserLogin } from "../../utils/api";
import { setCookie } from "../../utils/cookie";
import { SET_USER_DATA } from "./user";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export function setLogin(email, password) {
    return function(dispatch) {
        dispatch(loginRequestAC());
        postUserLogin(email, password).then(res => {
            const authToken = res.accessToken.split('Bearer ')[1];

            if (authToken) {
                setCookie('token', authToken);
                setCookie('refreshToken', res.refreshToken);
            }
            dispatch(loginSetUserDataAC(res.user.name, email, password))
        }).then(() => dispatch(loginSuccessRequestAC())).catch(() => dispatch(loginFailedRequestAC()));
    };
}

function loginRequestAC() {
    return { type: LOGIN_REQUEST }
}

function loginSetUserDataAC(name, email, password) {
    return { 
        type: SET_USER_DATA, 
        payload: {
            name: name,
            email: email,
            password: password,
        }
    }
}

function loginSuccessRequestAC() {
    return { type: LOGIN_SUCCESS }
}

function loginFailedRequestAC() {
    return { type: LOGIN_FAILED }
}