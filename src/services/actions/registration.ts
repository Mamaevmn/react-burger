import { postUserRegistration } from "../../utils/api";
import {
    REGISTRATION_DATA_FAILED,
    REGISTRATION_DATA_REQUEST,
    REGISTRATION_DATA_SUCCESS
} from "../constants";
import { AppDispatch, AppThunk } from "../types";

export interface IRegistrationRequestAC {
    readonly type: typeof REGISTRATION_DATA_REQUEST;
}

export interface IRegistrationSuccessRequestAC {
    readonly type: typeof REGISTRATION_DATA_SUCCESS;
}

export interface IRegistrationFailedRequestAC {
    readonly type: typeof REGISTRATION_DATA_FAILED;
    readonly payload: boolean
}

export type TRegistrationActions =
    | IRegistrationRequestAC
    | IRegistrationSuccessRequestAC
    | IRegistrationFailedRequestAC;


export function registrationRequestAC(): IRegistrationRequestAC {
    return { type: REGISTRATION_DATA_REQUEST }
}

export function registrationSuccessRequestAC(): IRegistrationSuccessRequestAC {
    return { type: REGISTRATION_DATA_SUCCESS }
}

export function registrationFailedRequestAC(): IRegistrationFailedRequestAC {
    return {
        type: REGISTRATION_DATA_FAILED,
        payload: false,
    }
}

export const setUserRegistration: AppThunk = (name: string, email: string, password: string) => (dispatch: AppDispatch) => {
    dispatch(registrationRequestAC());
    postUserRegistration(name, email, password).then(() => {
        dispatch(registrationSuccessRequestAC());
    }).catch(() => dispatch(registrationFailedRequestAC()));
};