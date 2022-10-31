import { postUserLogin } from "../../utils/api";
import { setCookie } from "../../utils/cookie";
import { SET_USER_DATA } from "./user";

export const SET_EMAIL_VALUE = 'SET_EMAIL_VALUE';
export const SET_PASSWORD_VALUE = 'SET_PASSWORD_VALUE';

export const CLEAR_LOGIN_FIELDS = 'CLEAR_LOGIN_FIELDS';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export function setLogin(email, password) {
    return function(dispatch) {
        dispatch({
            type: LOGIN_REQUEST
        });
        postUserLogin(email, password).then(res => {
            if (res && res.success) {
                const authToken = res.accessToken.split('Bearer ')[1];

                dispatch({ 
                    type: SET_USER_DATA, 
                    payload: {
                        name: res.user.name,
                        email: email,
                        password: password,
                }})
                if (authToken) {
                    setCookie('token', authToken);
                    setCookie('refreshToken', res.refreshToken);
                }
                dispatch({ type: CLEAR_LOGIN_FIELDS })
            } else {
                dispatch({
                    type: LOGIN_FAILED
                });
            }
        }).catch(e => {
            dispatch({
                type: LOGIN_FAILED
            });
        });
    };
}