import { loginFailedRequestAC, loginRequestAC, loginSuccessRequestAC, TLoginActions } from "../actions/login";
import { loginReducer, TLoginInitialState } from "./login";

it('login should be request', () => {
    let action: TLoginActions = loginRequestAC()

    let state:TLoginInitialState = {
        loginSuccess: false,
        loginRequest: false,
        loginFailed: false,
    }

    let newState = loginReducer(state, action);
    
    expect(newState).toEqual({
        loginSuccess: false,
        loginRequest: true,
        loginFailed: false,
    })
})

it('request login should be success', () => {
    let action: TLoginActions = loginSuccessRequestAC()

    let state:TLoginInitialState = {
        loginSuccess: false,
        loginRequest: true,
        loginFailed: false,
    }

    let newState = loginReducer(state, action);
    
    expect(newState).toEqual({
        loginSuccess: true,
        loginRequest: false,
        loginFailed: false,
    })
})

it('request login should be failed', () => {
    let action: TLoginActions = loginFailedRequestAC()

    let state:TLoginInitialState = {
        loginSuccess: false,
        loginRequest: true,
        loginFailed: false,
    }

    let newState = loginReducer(state, action);
    
    expect(newState).toEqual({
        loginSuccess: false,
        loginRequest: false,
        loginFailed: true,
    })
})
