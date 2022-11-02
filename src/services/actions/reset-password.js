import { postPasswordReset } from "../../utils/api";

export const PASSWORD_REQUEST = 'PASSWORD_REQUEST';
export const PASSWORD_SUCCESS = 'PASSWORD_SUCCESS';
export const PASSWORD_FAILED = 'PASSWORD_FAILED';

export function setPasswordReset(email) {
    return function(dispatch) {
        dispatch(resetPasswordRequestAC());
        postPasswordReset(email).then(res => {
            dispatch(resetPasswordSuccessRequestAC(res.message));
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