import { postUserRegistration } from "../../utils/api";

export const SET_REGISTRATION_NAME_VALUE = 'SET_REGISTRATION_NAME_VALUE';
export const SET_REGISTRATION_EMAIL_VALUE = 'SET_REGISTRATION_EMAIL_VALUE';
export const SET_REGISTRATION_PASSWORD_VALUE = 'SET_REGISTRATION_PASSWORD_VALUE';

export const CLEAR_REGISTRATION_FIELDS = 'CLEAR_REGISTRATION_FIELDS';

export const REGISTRATION_DATA_REQUEST = 'REGISTRATION_DATA_REQUEST';
export const REGISTRATION_DATA_SUCCESS = 'REGISTRATION_DATA_SUCCESS';
export const REGISTRATION_DATA_FAILED = 'REGISTRATION_DATA_FAILED';

export function setUserRegistration(name, email, password) {
    return function(dispatch) {
        dispatch(registrationRequestAC());
        postUserRegistration(name, email, password).then(res => {
            dispatch(registrationSuccessRequestAC());
            dispatch(clearRegistrationFieldsAC())
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

function clearRegistrationFieldsAC() {
    return { type: CLEAR_REGISTRATION_FIELDS }
}