import { postUserRegistration } from "../../utils/api";
import {
    REGISTRATION_DATA_FAILED,
    REGISTRATION_DATA_REQUEST,
    REGISTRATION_DATA_SUCCESS
} from "../constants";
import { AppDispatch, AppThunk } from "../types";
import { TEmail, TName, TPassword } from "../types/data";

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


function registrationRequestAC() {
    return { type: REGISTRATION_DATA_REQUEST }
}

function registrationSuccessRequestAC() {
    return { type: REGISTRATION_DATA_SUCCESS }
}

function registrationFailedRequestAC() {
    return {
        type: REGISTRATION_DATA_FAILED,
        payload: false,
    }
}

export const setUserRegistration: AppThunk = (name: TName, email: TEmail, password: TPassword) => (dispatch: AppDispatch) => {
    dispatch(registrationRequestAC());
    postUserRegistration(name, email, password).then(() => {
        dispatch(registrationSuccessRequestAC());
    }).catch(() => dispatch(registrationFailedRequestAC()));
};