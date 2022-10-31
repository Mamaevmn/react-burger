import { postPasswordReсovery } from "../../utils/api";

export const SET_RECOVERY_EMAIL_VALUE = 'SET_RECOVERY_EMAIL_VALUE';

export const CLEAR_EMAIL_VALUE = 'CLEAR_EMAIL_VALUE';

export const RECOVERY_PASSWORD_REQUEST = 'RECOVERY_PASSWORD_REQUEST';
export const RECOVERY_PASSWORD_SUCCESS = 'RECOVERY_PASSWORD_SUCCESS';
export const RECOVERY_PASSWORD_FAILED = 'RECOVERY_PASSWORD_FAILED';

export function setPasswordRecovery(email) {
    return function(dispatch) {
        dispatch({
            type: RECOVERY_PASSWORD_REQUEST
        });
        postPasswordReсovery(email).then(res => {
            if (res && res.success) {
                dispatch({
                    type: RECOVERY_PASSWORD_SUCCESS,
                    payload: res.message,
                });
                dispatch({ type: CLEAR_EMAIL_VALUE })
            } else {
                dispatch({
                    type: RECOVERY_PASSWORD_FAILED
                });
            }
        }).catch(e => {
            dispatch({
                type: RECOVERY_PASSWORD_FAILED
            });
        });
    };
}