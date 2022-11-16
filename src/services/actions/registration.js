import { postUserRegistration } from "../../utils/api";

export const REGISTRATION_DATA_REQUEST = 'REGISTRATION_DATA_REQUEST';
export const REGISTRATION_DATA_SUCCESS = 'REGISTRATION_DATA_SUCCESS';
export const REGISTRATION_DATA_FAILED = 'REGISTRATION_DATA_FAILED';

export function setUserRegistration(name, email, password) {
    return function(dispatch) {
        dispatch(registrationRequestAC());
        postUserRegistration(name, email, password).then(res => {
            dispatch(registrationSuccessRequestAC());
        }).catch(() => dispatch(registrationFailedRequestAC()));
    };
}

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