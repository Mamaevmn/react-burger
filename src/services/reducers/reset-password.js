import { 
    SET_CODE_VALUE,
    SET_RESET_PASSWORD_VALUE, 
    CLEAR_RESET_PASSWORD_FIELDS, 
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
        case SET_RESET_PASSWORD_VALUE: {
            const passwordIsValid = action.payload.length >= 6;;

            return {
                ...state,
                password: action.payload,
                passwordIsValid: passwordIsValid
            }
        }
        case SET_CODE_VALUE: {
            const codeIsValid = action.payload === '123';

            return {
                ...state,
                code: action.payload,
                codeIsValid: codeIsValid
            }
        }
        case CLEAR_RESET_PASSWORD_FIELDS: {
            return {
                ...state,
                password: '',
                code: '',
                passwordIsValid: false,
                codeIsValid: false,
            }
        }
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