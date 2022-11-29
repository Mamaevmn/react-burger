import { TRegistrationActions } from "../actions/registration";
import {
    REGISTRATION_DATA_REQUEST,
    REGISTRATION_DATA_SUCCESS,
    REGISTRATION_DATA_FAILED,
} from "../constants";

export type TRegistrationInitialState = {
    registrationSuccess: boolean,
    registrationRequest: boolean,
    registrationFailed: boolean,
};

const registrationInitialState: TRegistrationInitialState = {
    registrationSuccess: false,
    registrationRequest: false,
    registrationFailed: false,
};

export const registrationReducer = (
    state = registrationInitialState,
    action: TRegistrationActions
) => {
    switch (action.type) {
        case REGISTRATION_DATA_REQUEST: {
            return {
                ...state,
                registrationRequest: true,
                registrationSuccess: false,
            };
        }
        case REGISTRATION_DATA_SUCCESS: {
            return {
                ...state,
                registrationSuccess: true,
                registrationRequest: false,
                registrationFailed: false,
            };
        }
        case REGISTRATION_DATA_FAILED: {
            return {
                ...state,
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