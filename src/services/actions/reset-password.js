import { postPasswordReset } from "../../utils/api";

export const SET_RESET_PASSWORD_VALUE = 'SET_RESET_PASSWORD_VALUE';
export const SET_CODE_VALUE = 'SET_CODE_VALUE';

export const CLEAR_RESET_PASSWORD_FIELDS = 'CLEAR_RESET_PASSWORD_FIELDS';

export const PASSWORD_REQUEST = 'PASSWORD_REQUEST';
export const PASSWORD_SUCCESS = 'PASSWORD_SUCCESS';
export const PASSWORD_FAILED = 'PASSWORD_FAILED';

export function setPasswordReset(email) {
    return function(dispatch) {
        dispatch(resetPasswordRequestAC());
        postPasswordReset(email).then(res => {
            dispatch(resetPasswordSuccessRequestAC(res.message));
            dispatch(clearResetPasswordFieldsAC())
        }).catch(() => dispatch(resetPasswordFailedRequestAC()))
    };
}

function resetPasswordRequestAC() {
    return { type: PASSWORD_REQUEST }
}

function resetPasswordSuccessRequestAC(message) {
    return {
        type: PASSWORD_SUCCESS,
        payload: message,
    }
}

function resetPasswordFailedRequestAC() {
    return { type: PASSWORD_FAILED }
}

function clearResetPasswordFieldsAC() {
    return { type: CLEAR_RESET_PASSWORD_FIELDS }
}