import { postUserLogin } from "../../utils/api";
import { setCookie } from "../../utils/cookie";
import {
    LOGIN_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    SET_USER_DATA
} from "../constants";
import { AppDispatch, AppThunk } from "../types";

export interface ILoginRequestAC {
    readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSetUserDataAC {
    readonly type: typeof SET_USER_DATA;
    readonly payload: {
        name: string;
        email: string;
        password: string;
    }
}

export interface ILoginSuccessRequestAC {
    readonly type: typeof LOGIN_SUCCESS;
}

export interface ILoginFailedRequestAC {
    readonly type: typeof LOGIN_FAILED;
}

export type TLoginActions =
    | ILoginRequestAC
    | ILoginSetUserDataAC
    | ILoginSuccessRequestAC
    | ILoginFailedRequestAC;

function loginRequestAC(): ILoginRequestAC {
    return { type: LOGIN_REQUEST }
}

function loginSetUserDataAC(name: string, email: string, password: string): ILoginSetUserDataAC {
    return {
        type: SET_USER_DATA,
        payload: {
            name: name,
            email: email,
            password: password,
        }
    }
}

function loginSuccessRequestAC(): ILoginSuccessRequestAC {
    return { type: LOGIN_SUCCESS }
}

function loginFailedRequestAC(): ILoginFailedRequestAC {
    return { type: LOGIN_FAILED }
}

export const setLogin: AppThunk = (email: string, password: string) => (dispatch: AppDispatch) => {
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
