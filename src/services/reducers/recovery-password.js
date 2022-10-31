import { 
    CLEAR_EMAIL_VALUE,
    RECOVERY_PASSWORD_FAILED, 
    RECOVERY_PASSWORD_REQUEST, 
    RECOVERY_PASSWORD_SUCCESS,
    SET_RECOVERY_EMAIL_VALUE,
} from "../actions/recovery-password";

const recoveryInitialState = {
    email: '',
    emailIsValid: false,
    recoveryPasswordMessage: '',
    recoveryPasswordSuccess: false,
    recoveryPasswordRequest: false,
    recoveryPasswordFailed: false,
};

export const recoveryReducer = (state = recoveryInitialState, action) => {
    switch (action.type) {
        case SET_RECOVERY_EMAIL_VALUE: {
            const emailIsValid = !!action.payload.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

            return {
                ...state,
                email: action.payload,
                emailIsValid: emailIsValid
            }
        }
        case CLEAR_EMAIL_VALUE: {
            return {
                ...state,
                email: '',
                emailIsValid: false,
            }
        }
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