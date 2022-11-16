import { 
    RECOVERY_PASSWORD_FAILED, 
    RECOVERY_PASSWORD_REQUEST, 
    RECOVERY_PASSWORD_SUCCESS,
} from "../actions/recovery-password";

const recoveryInitialState = {
    recoveryPasswordMessage: '',
    recoveryPasswordSuccess: false,
    recoveryPasswordRequest: false,
    recoveryPasswordFailed: false,
};

export const recoveryReducer = (state = recoveryInitialState, action) => {
    switch (action.type) {
        case RECOVERY_PASSWORD_REQUEST: {
            return {
              ...state,
              recoveryPasswordRequest: true,
              recoveryPasswordSuccess: false,
            };
        }
        case RECOVERY_PASSWORD_SUCCESS: {
            return { 
                ...state, 
                recoveryPasswordMessage: action.payload, 
                recoveryPasswordSuccess: true,
                recoveryPasswordRequest: false,
                recoveryPasswordFailed: false, 
            };
        }
        case RECOVERY_PASSWORD_FAILED: {
            return { ...state, recoveryPasswordFailed: true, recoveryPasswordRequest: false, recoveryPasswordSuccess: false};
        }
        default: {
            return state;
        }
    }
}