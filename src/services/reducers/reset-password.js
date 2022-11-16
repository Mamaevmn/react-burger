import { 
    PASSWORD_REQUEST,
    PASSWORD_SUCCESS,
    PASSWORD_FAILED
} from "../actions/reset-password";

const resetPasswordInitialState = {
    password: '',
    code: '',
    passwordIsValid: false,
    codeIsValid: false,

    resetPasswordMessage: '',
    resetPasswordRequest: false,
    resetPasswordFailed: false,

};

export const resetPasswordReducer = (state = resetPasswordInitialState, action) => {
    switch (action.type) {
        case PASSWORD_REQUEST: {
            return {
              ...state,
              resetPasswordRequest: true
            };
        }
        case PASSWORD_SUCCESS: {
            return { 
                ...state, 
                resetPasswordMessage: action.payload, 
                resetPasswordRequest: false, 
                resetPasswordFailed: false, 
            };
        }
        case PASSWORD_FAILED: {
            return { ...state, resetPasswordFailed: true, resetPasswordRequest: false };
        }
        default: {
            return state;
        }
    }
}