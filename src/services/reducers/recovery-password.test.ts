import { recoveryPasswordFailedRequestAC, recoveryPasswordRequestAC, recoveryPasswordSuccessRequestAC, TRecoveryPasswordActions } from "../actions/recovery-password";
import { recoveryReducer, TRecoveryInitialState } from "./recovery-password";

it('recovery password should be request', () => {
    let action: TRecoveryPasswordActions = recoveryPasswordRequestAC()

    let state:TRecoveryInitialState = {
        recoveryPasswordMessage: '',
        recoveryPasswordSuccess: false,
        recoveryPasswordRequest: false,
        recoveryPasswordFailed: false,
    }

    let newState = recoveryReducer(state, action);
    
    expect(newState).toEqual({
        recoveryPasswordMessage: '',
        recoveryPasswordSuccess: false,
        recoveryPasswordRequest: true,
        recoveryPasswordFailed: false,
    })
})

it('request recovery password should be success', () => {
    let action: TRecoveryPasswordActions = recoveryPasswordSuccessRequestAC('recovery password success')

    let state:TRecoveryInitialState = {
        recoveryPasswordMessage: '',
        recoveryPasswordSuccess: false,
        recoveryPasswordRequest: true,
        recoveryPasswordFailed: false,
    }

    let newState = recoveryReducer(state, action);
    
    expect(newState).toEqual({
        recoveryPasswordMessage: 'recovery password success',
        recoveryPasswordSuccess: true,
        recoveryPasswordRequest: false,
        recoveryPasswordFailed: false,
    })
})

it('request recovery password should be failed', () => {
    let action: TRecoveryPasswordActions = recoveryPasswordFailedRequestAC()

    let state:TRecoveryInitialState = {
        recoveryPasswordMessage: '',
        recoveryPasswordSuccess: false,
        recoveryPasswordRequest: true,
        recoveryPasswordFailed: false,
    }

    let newState = recoveryReducer(state, action);
    
    expect(newState).toEqual({
        recoveryPasswordMessage: '',
        recoveryPasswordSuccess: false,
        recoveryPasswordRequest: false,
        recoveryPasswordFailed: true,
    })
})
