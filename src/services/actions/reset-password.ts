import { postPasswordReset } from "../../utils/api";
import {
    PASSWORD_FAILED,
    PASSWORD_REQUEST,
    PASSWORD_SUCCESS
} from "../constants";
import { AppDispatch } from "../types";

export interface IResetPasswordRequestAC {
    readonly type: typeof PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessRequestAC {
    readonly type: typeof PASSWORD_SUCCESS;
    readonly payload: string
}

export interface IResetPasswordFailedRequestAC {
    readonly type: typeof PASSWORD_FAILED;
}

export type TResetPasswordActions =
    | IResetPasswordRequestAC
    | IResetPasswordSuccessRequestAC
    | IResetPasswordFailedRequestAC;

export function resetPasswordRequestAC(): IResetPasswordRequestAC {
    return { type: PASSWORD_REQUEST }
}

export function resetPasswordSuccessRequestAC(message: string): IResetPasswordSuccessRequestAC {
    return {
        type: PASSWORD_SUCCESS,
        payload: message,
    }
}

export function resetPasswordFailedRequestAC(): IResetPasswordFailedRequestAC {
    return { type: PASSWORD_FAILED }
}

export const setPasswordReset = (email: string) => (dispatch: AppDispatch) => {
    dispatch(resetPasswordRequestAC());
    postPasswordReset(email).then(res => {
        dispatch(resetPasswordSuccessRequestAC(res.message));
    }).catch(() => dispatch(resetPasswordFailedRequestAC()))
};