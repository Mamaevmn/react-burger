import { editUserInfo, getUserInfo, postUpdateToken, postUserLogout } from "../../utils/api";
import { deleteCookie, setCookie } from "../../utils/cookie";
import { AppDispatch, AppThunk } from "../types";
import { 
    TEmail, 
    TName, 
    TPassword 
} from "../types/data";
import { 
    CLEAR_USER_DATA, 
    SET_USER_DATA, 
    USER_FAILED, 
    USER_REQUEST, 
    USER_SUCCESS 
} from "../constants";


export interface IUserRequestAC {
    readonly type: typeof USER_REQUEST;
}

export interface IUserSuccessRequestAC {
    readonly type: typeof USER_SUCCESS;
    readonly payload: {
        name: TName;
        email: TEmail
    }
}

export interface ISetUserDataAC {
    readonly type: typeof SET_USER_DATA;
    readonly payload: {
        name: TName;
        email: TEmail;
        password: TPassword;
        token: string;
        refreshToken: string;
        auth: boolean;
    }
}

export interface IUserFailedRequestAC {
    readonly type: typeof USER_FAILED;
}

export interface IClearUserDataAC {
    readonly type: typeof CLEAR_USER_DATA;
}

export type TUserActions =
    | IUserRequestAC
    | IUserSuccessRequestAC
    | IUserFailedRequestAC
    | ISetUserDataAC
    | IClearUserDataAC;

function userRequestAC() {
    return { type: USER_REQUEST }
}

function userSuccessRequestAC(name: TName, email: TEmail) {
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

export const getUser: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(userRequestAC());
    getUserInfo().then(res => {
        dispatch(userSuccessRequestAC(res.user.name, res.user.email))
    }).catch(() => {
        // @ts-ignore
        dispatch(updateToken())
        dispatch(userFailedRequestAC())
    });
};

export const userLogout: AppThunk = (redirect: () => void) => (dispatch: AppDispatch) => {
    dispatch(userRequestAC());
    postUserLogout().then(() => {
        deleteCookie('token')
    }).then(() => deleteCookie('refreshToken')
    ).then(() => dispatch(clearUserDataAC())
    ).then(() => redirect()
    ).catch(() => dispatch(userFailedRequestAC()));
};

export const updateToken: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(userRequestAC());
    postUpdateToken().then(res => {
        const authToken = res.accessToken.split('Bearer ')[1];
        if (authToken) {
            setCookie('token', authToken)
            setCookie('refreshToken', res.refreshToken);
        }
    }).catch(() => dispatch(userFailedRequestAC()));
};

export const setUserData: AppThunk = (name: TName, email: TEmail, password: TPassword) => (dispatch: AppDispatch) => {
    dispatch(userRequestAC());
    editUserInfo(name, email, password).then().catch(() => dispatch(userFailedRequestAC()));
};