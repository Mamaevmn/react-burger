import { 
    SET_EMAIL_VALUE,
    SET_PASSWORD_VALUE, 
    CLEAR_LOGIN_FIELDS, 
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED
} from "../actions/login";

const loginInitialState = {
    email: '',
    password: '',
    emailIsValid: false,
    passwordIsValid: false,

    loginSuccess: false,
    loginRequest: false,
    loginFailed: false,
};

export const loginReducer = (state = loginInitialState, action) => {
    switch (action.type) {
        case SET_EMAIL_VALUE: {
            const emailIsValid = !!action.payload.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

            return {
                ...state,
                email: action.payload,
                emailIsValid: emailIsValid,
                loginFailed: false,
            }
        }
        case SET_PASSWORD_VALUE: {
            const passwordIsValid = action.payload.length >= 6;;

            return {
                ...state,
                password: action.payload,
                passwordIsValid: passwordIsValid,
                loginFailed: false,
            }
        }
        case CLEAR_LOGIN_FIELDS: {
            return {
                ...state,
                email: '',
                password: '',
                emailIsValid: false,
                passwordIsValid: false,
            }
        }
        case LOGIN_REQUEST: {
            return {
              ...state,
              loginRequest: true,
              loginSuccess: false,
            };
        }
        case LOGIN_SUCCESS: {
            return { 
                ...state, 
                loginSuccess: true,
                loginRequest: false, 
                loginFailed: false, 
            };
        }
        case LOGIN_FAILED: {
            return { 
                ...state, 
                loginSuccess: false,
                loginFailed: true, 
                loginRequest: false 
            };
        }
        default: {
            return state;
        }
    }
}