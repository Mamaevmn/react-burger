import { postPasswordReset } from "../../utils/api";
import {
    PASSWORD_FAILED,
    PASSWORD_REQUEST,
    PASSWORD_SUCCESS
} from "../constants";
import { AppDispatch } from "../types";
import { TEmail } from "../types/data";

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

function resetPasswordRequestAC(): IResetPasswordRequestAC {
    return { type: PASSWORD_REQUEST }
}

function resetPasswordSuccessRequestAC(message: string): IResetPasswordSuccessRequestAC {
    return {
        type: PASSWORD_SUCCESS,
        payload: message,
    }
}

function resetPasswordFailedRequestAC(): IResetPasswordFailedRequestAC {
    return { type: PASSWORD_FAILED }
}

export const setPasswordReset = (email: TEmail) => (dispatch: AppDispatch) => {
    dispatch(resetPasswordRequestAC());
    postPasswordReset(email).then(res => {
        dispatch(resetPasswordSuccessRequestAC(res.message));
    }).catch(() => dispatch(resetPasswordFailedRequestAC()))
};