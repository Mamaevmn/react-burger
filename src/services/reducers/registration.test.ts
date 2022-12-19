import { registrationFailedRequestAC, registrationRequestAC, registrationSuccessRequestAC, TRegistrationActions } from "../actions/registration";
import { registrationReducer, TRegistrationInitialState } from "./registration";

it('registration should be request', () => {
    let action: TRegistrationActions = registrationRequestAC()

    let state:TRegistrationInitialState = {
        registrationSuccess: false,
        registrationRequest: false,
        registrationFailed: false,
    }

    let newState = registrationReducer(state, action);
    
    expect(newState).toEqual({
        registrationSuccess: false,
        registrationRequest: true,
        registrationFailed: false,
    })
})

it('request registration should be success', () => {
    let action: TRegistrationActions = registrationSuccessRequestAC()

    let state:TRegistrationInitialState = {
        registrationSuccess: false,
        registrationRequest: true,
        registrationFailed: false,
    }

    let newState = registrationReducer(state, action);
    
    expect(newState).toEqual({
        registrationSuccess: true,
        registrationRequest: false,
        registrationFailed: false,
    })
})

it('request registration should be failed', () => {
    let action: TRegistrationActions = registrationFailedRequestAC()

    let state:TRegistrationInitialState = {
        registrationSuccess: false,
        registrationRequest: true,
        registrationFailed: false,
    }

    let newState = registrationReducer(state, action);
    
    expect(newState).toEqual({
        registrationSuccess: false,
        registrationRequest: false,
        registrationFailed: true,
    })
})
