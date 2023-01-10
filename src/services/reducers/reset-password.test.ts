import { resetPasswordFailedRequestAC, resetPasswordRequestAC, resetPasswordSuccessRequestAC, TResetPasswordActions } from "../actions/reset-password";
import { resetPasswordReducer, TResetPasswordInitialState } from "./reset-password";

it('reset password should be request', () => {
    let action: TResetPasswordActions = resetPasswordRequestAC()

    let state:TResetPasswordInitialState = {
        password: null,
        code: null,
        passwordIsValid: false,
        codeIsValid: false,
    
        resetPasswordMessage: '',
        resetPasswordRequest: false,
        resetPasswordFailed: false,
    }

    let newState = resetPasswordReducer(state, action);
    
    expect(newState).toEqual({
        password: null,
        code: null,
        passwordIsValid: false,
        codeIsValid: false,
    
        resetPasswordMessage: '',
        resetPasswordRequest: true,
        resetPasswordFailed: false,
    })
})

it('request reset password should be success', () => {
    let action: TResetPasswordActions = resetPasswordSuccessRequestAC('reset password success')

    let state:TResetPasswordInitialState = {
        password: null,
        code: null,
        passwordIsValid: false,
        codeIsValid: false,
    
        resetPasswordMessage: '',
        resetPasswordRequest: true,
        resetPasswordFailed: false,
    }

    let newState = resetPasswordReducer(state, action);
    
    expect(newState).toEqual({
        password: null,
        code: null,
        passwordIsValid: false,
        codeIsValid: false,
    
        resetPasswordMessage: 'reset password success',
        resetPasswordRequest: false,
        resetPasswordFailed: false,
    })
})

it('request reset password should be failed', () => {
    let action: TResetPasswordActions = resetPasswordFailedRequestAC()

    let state:TResetPasswordInitialState = {
        password: null,
        code: null,
        passwordIsValid: false,
        codeIsValid: false,
    
        resetPasswordMessage: '',
        resetPasswordRequest: true,
        resetPasswordFailed: false,
    }

    let newState = resetPasswordReducer(state, action);
    
    expect(newState).toEqual({
        password: null,
        code: null,
        passwordIsValid: false,
        codeIsValid: false,
    
        resetPasswordMessage: '',
        resetPasswordRequest: false,
        resetPasswordFailed: true,
    })
})
