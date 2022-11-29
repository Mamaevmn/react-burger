import { postPasswordReсovery } from "../../utils/api";
import { 
    RECOVERY_PASSWORD_FAILED, 
    RECOVERY_PASSWORD_REQUEST, 
    RECOVERY_PASSWORD_SUCCESS 
} from "../constants";
import { AppDispatch, AppThunk } from "../types";
import { TEmail } from "../types/data";

export interface IRecoveryPasswordRequestAC {
    readonly type: typeof RECOVERY_PASSWORD_REQUEST;
}

export interface IRecoveryPasswordSuccessRequestAC {
    readonly type: typeof RECOVERY_PASSWORD_SUCCESS;
    readonly payload: string
}

export interface IRecoveryPasswordFailedRequestAC {
    readonly type: typeof RECOVERY_PASSWORD_FAILED;
}

export type TRecoveryPasswordActions =
    | IRecoveryPasswordRequestAC
    | IRecoveryPasswordSuccessRequestAC
    | IRecoveryPasswordFailedRequestAC;

function recoveryPasswordRequestAC() {
    return { type: RECOVERY_PASSWORD_REQUEST }
}

function recoveryPasswordSuccessRequestAC(message: string) {
    return {
        type: RECOVERY_PASSWORD_SUCCESS,
        payload: message,
    }
}

function recoveryPasswordFailedRequestAC() {
    return { type: RECOVERY_PASSWORD_FAILED }
}

export const setPasswordRecovery: AppThunk = (email: TEmail) => (dispatch: AppDispatch) => {
        dispatch(recoveryPasswordRequestAC());
        postPasswordReсovery(email).then(res => {
            dispatch(recoveryPasswordSuccessRequestAC(res.message));
        }).catch(() => dispatch(recoveryPasswordFailedRequestAC()));
    };