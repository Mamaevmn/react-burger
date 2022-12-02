import { TResetPasswordActions } from "../actions/reset-password";
import {
    PASSWORD_REQUEST,
    PASSWORD_SUCCESS,
    PASSWORD_FAILED
} from "../constants";
import { TPassword } from "../types/data";

export type TResetPasswordInitialState = {
    password: TPassword,
    code: string | number,
    passwordIsValid: boolean,
    codeIsValid: boolean,
    resetPasswordMessage: string,
    resetPasswordRequest: boolean,
    resetPasswordFailed: boolean,
};

const resetPasswordInitialState: TResetPasswordInitialState = {
    password: null,
    code: null,
    passwordIsValid: false,
    codeIsValid: false,

    resetPasswordMessage: '',
    resetPasswordRequest: false,
    resetPasswordFailed: false,
};

export const resetPasswordReducer = (
    state = resetPasswordInitialState,
    action: TResetPasswordActions
) => {
    switch (action.type) {
        case PASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordRequest: true
            };
        }
        case PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordMessage: action.payload,
                resetPasswordRequest: false,
                resetPasswordFailed: false,
            };
        }
        case PASSWORD_FAILED: {
            return { ...state, resetPasswordFailed: true, resetPasswordRequest: false };
        }
        default: {
            return state;
        }
    }
}