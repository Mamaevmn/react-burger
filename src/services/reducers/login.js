import { 
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED
} from "../actions/login";

const loginInitialState = {
    loginSuccess: false,
    loginRequest: false,
    loginFailed: false,
};

export const loginReducer = (state = loginInitialState, action) => {
    switch (action.type) {
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