import { TUserActions } from "../actions/user";
import {
    SET_USER_DATA,
    CLEAR_USER_DATA,
    USER_REQUEST,
    USER_SUCCESS,
    USER_FAILED,
} from "../constants";
import { TEmail, TName, TPassword } from "../types/data";

export type TUserInitialState = {
    name: TName,
    email: TEmail,
    password: TPassword,
    token: string,
    refreshToken: string,
    auth: boolean,
    userRequest: boolean,
    userFailed: boolean
};

const userInitialState = {
    name: '',
    email: '',
    password: '',
    token: '',
    refreshToken: '',
    auth: false,

    userRequest: false,
    userFailed: false
};

export const userReducer = (
    state = userInitialState,
    action: TUserActions
) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                password: action.payload.password,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken,
                auth: true,
            }
        }
        case CLEAR_USER_DATA: {
            return {
                ...state,
                name: '',
                email: '',
                password: '',
                token: '',
                refreshToken: '',
                auth: false,
            }
        }
        case USER_REQUEST: {
            return {
                ...state,
                userRequest: true,
                auth: false,
            };
        }
        case USER_SUCCESS: {
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                userRequest: false,
                userFailed: false,
                auth: true,
            };
        }
        case USER_FAILED: {
            return {
                ...state,
                userFailed: true,
                userRequest: false,
                auth: false,
            };
        }
        default: {
            return state;
        }
    }
}