import { postPasswordReset } from "../../utils/api";

export const SET_RESET_PASSWORD_VALUE = 'SET_RESET_PASSWORD_VALUE';
export const SET_CODE_VALUE = 'SET_CODE_VALUE';

export const CLEAR_RESET_PASSWORD_FIELDS = 'CLEAR_RESET_PASSWORD_FIELDS';

export const PASSWORD_REQUEST = 'PASSWORD_REQUEST';
export const PASSWORD_SUCCESS = 'PASSWORD_SUCCESS';
export const PASSWORD_FAILED = 'PASSWORD_FAILED';

export function setPasswordReset(email) {
    return function(dispatch) {
        dispatch({
            type: PASSWORD_REQUEST
        });
        postPasswordReset(email).then(res => {
            if (res && res.success) {
                dispatch({
                    type: PASSWORD_SUCCESS,
                    payload: res.message,
                });
                dispatch({ type: CLEAR_RESET_PASSWORD_FIELDS })
            } else {
                dispatch({
                    type: PASSWORD_FAILED
                });
            }
        }).catch(e => {
            dispatch({
                type: PASSWORD_FAILED
            });
        });
    };
}