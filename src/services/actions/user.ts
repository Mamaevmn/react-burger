import { editUserInfo, getUserInfo, postUpdateToken, postUserLogout } from "../../utils/api";
import { deleteCookie, setCookie } from "../../utils/cookie";
import { AppDispatch, AppThunk } from "../types";
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
        name: string;
        email: string
    }
}

export interface ISetUserDataAC {
    readonly type: typeof SET_USER_DATA;
    readonly payload: {
        name: string;
        email: string;
        password: string;
        token: string;
        refreshToken: string;
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

export function userRequestAC(): IUserRequestAC {
    return { type: USER_REQUEST }
}

export function userSuccessRequestAC(name: string, email: string): IUserSuccessRequestAC {
    return {
        type: USER_SUCCESS,
        payload: {
            name: name,
            email: email,
        }
    }
}

export function userFailedRequestAC(): IUserFailedRequestAC {
    return { type: USER_FAILED }
}

export function clearUserDataAC(): IClearUserDataAC {
    return { type: CLEAR_USER_DATA }
}

export function setUserDataAC(
    name: string,
    email: string,
    password: string,
    token: string,
    refreshToken: string,
): ISetUserDataAC {
    return {
        type: SET_USER_DATA,
        payload: {
            name: name,
            email: email,
            password: password,
            token: token,
            refreshToken: refreshToken,
        }
    }
}

export const getUser: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(userRequestAC());
    getUserInfo().then(res => {
        dispatch(userSuccessRequestAC(res.user.name, res.user.email))
    }).catch(() => {
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

export const setUserData: AppThunk = (name: string, email: string, password: string) => (dispatch: AppDispatch) => {
    dispatch(userRequestAC());
    editUserInfo(name, email, password).then().catch(() => dispatch(userFailedRequestAC()));
};