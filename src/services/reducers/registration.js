import { 
    SET_REGISTRATION_NAME_VALUE,
    SET_REGISTRATION_EMAIL_VALUE,
    SET_REGISTRATION_PASSWORD_VALUE, 
    CLEAR_REGISTRATION_FIELDS, 
    REGISTRATION_DATA_REQUEST,
    REGISTRATION_DATA_SUCCESS,
    REGISTRATION_DATA_FAILED,
} from "../actions/registration";

const registrationInitialState = {
    name: '',
    email: '',
    password: '',
    emailIsValid: false,
    passwordIsValid: false,
    
    userIsExist: false,
    registrationSuccess: false,
    registrationRequest: false,
    registrationFailed: false,
};

export const registrationReducer = (state = registrationInitialState, action) => {
    switch (action.type) {
        case SET_REGISTRATION_NAME_VALUE: {
            return {
                ...state,
                userIsExist: false,
                name: action.payload,
            }
        }
        case SET_REGISTRATION_EMAIL_VALUE: {
            const emailIsValid = !!action.payload.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

            return {
                ...state,
                userIsExist: false,
                email: action.payload,
                emailIsValid: emailIsValid,
            }
        }
        case SET_REGISTRATION_PASSWORD_VALUE: {
            const passwordIsValid = action.payload.length >= 6;;

            return {
                ...state,
                userIsExist: false,
                password: action.payload,
                passwordIsValid: passwordIsValid
            }
        }
        case CLEAR_REGISTRATION_FIELDS: {
            return {
                ...state,
                name: '',
                email: '',
                password: '',
                emailIsValid: false,
                passwordIsValid: false,
                userIsExist: false,
            }
        }
        case REGISTRATION_DATA_REQUEST: {
            return {
                ...state,
                registrationRequest: true,
                userIsExist: false,
                registrationSuccess: false,
            };
        }
        case REGISTRATION_DATA_SUCCESS: {
            return { 
                ...state, 
                userIsExist: false,
                registrationSuccess: true, 
                registrationRequest: false, 
                registrationFailed: false, 
            };
        }
        case REGISTRATION_DATA_FAILED: {
            return { 
                ...state, 
                userIsExist: action.payload ? action.payload : false,
                registrationFailed: true, 
                registrationSuccess: false, 
                registrationRequest: false,
            };
        }
        default: {
            return state;
        }
    }
}