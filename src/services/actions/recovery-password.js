import { postPasswordReсovery } from "../../utils/api";

export const SET_RECOVERY_EMAIL_VALUE = 'SET_RECOVERY_EMAIL_VALUE';

export const CLEAR_EMAIL_VALUE = 'CLEAR_EMAIL_VALUE';

export const RECOVERY_PASSWORD_REQUEST = 'RECOVERY_PASSWORD_REQUEST';
export const RECOVERY_PASSWORD_SUCCESS = 'RECOVERY_PASSWORD_SUCCESS';
export const RECOVERY_PASSWORD_FAILED = 'RECOVERY_PASSWORD_FAILED';

export function setPasswordRecovery(email) {
    return function(dispatch) {
        dispatch(recoveryPasswordRequestAC());
        postPasswordReсovery(email).then(res => {
            dispatch(recoveryPasswordSuccessRequestAC(res.message));
            dispatch(clearRecoveryPasswordFieldsAC())
        }).catch(() => dispatch(recoveryPasswordFailedRequestAC()));
    };
}

function recoveryPasswordRequestAC() {
    return { type: RECOVERY_PASSWORD_REQUEST }
}

function recoveryPasswordSuccessRequestAC(message) {
    return {
        type: RECOVERY_PASSWORD_SUCCESS,
        payload: message,
    }
}

function recoveryPasswordFailedRequestAC() {
    return { type: RECOVERY_PASSWORD_FAILED }
}

function clearRecoveryPasswordFieldsAC() {
    return { type: CLEAR_EMAIL_VALUE }
}