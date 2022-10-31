import { 
    SET_USER_DATA,
    SET_USER_NAME_VALUE,
    SET_USER_EMAIL_VALUE,
    SET_USER_PASSWORD_VALUE,
    CLEAR_USER_DATA,
    USER_REQUEST,
    USER_SUCCESS,
    USER_FAILED,
    CLEAR_USER_CHANGING,
} from "../actions/user";

const userInitialState = {
    name: '',
    email: '',
    password: '',
    token: '',
    refreshToken: '',
    auth: false,

    userRequest: false,
    userFailed: false
};

export const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                password: action.payload.password,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken,
                auth: true,
            }
        }
        case SET_USER_NAME_VALUE: {
            return {
                ...state,
                name: action.payload,
            }
        }
        case SET_USER_EMAIL_VALUE: {
            return {
                ...state,
                email: action.payload,
            }
        }
        case SET_USER_PASSWORD_VALUE: {
            return {
                ...state,
                password: action.payload,
            }
        }
        case CLEAR_USER_CHANGING: {
            return {
                ...state,
            }
        }
        case CLEAR_USER_DATA: {
            return {
                ...state,
                name: '',
                email: '',
                password: '',
                token: '',
                refreshToken: '',
                auth: false,
            }
        }
        case USER_REQUEST: {
            return {
              ...state,
              userRequest: true,
              auth: false,
            };
        }
        case USER_SUCCESS: {
            return { 
                ...state, 
                name: action.payload.name,
                email: action.payload.email,
                userRequest: false, 
                userFailed: false, 
                auth: true,
            };
        }
        case USER_FAILED: {
            return { 
                ...state, 
                userFailed: true, 
                userRequest: false,
                auth: false,
            };
        }
        default: {
            return state;
        }
    }
}