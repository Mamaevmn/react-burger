import { clearUserDataAC, setUserDataAC, TUserActions, userFailedRequestAC, userRequestAC, userSuccessRequestAC } from "../actions/user";
import { TUserInitialState, userReducer } from "./user";

it('user should be request', () => {
    let action: TUserActions = userRequestAC()

    let state:TUserInitialState = {
        name: null,
        email: null,
        password: null,
        token: null,
        refreshToken: null,
        auth: false,
    
        userRequest: false,
        userFailed: false
    }

    let newState = userReducer(state, action);
    
    expect(newState).toEqual({
        name: null,
        email: null,
        password: null,
        token: null,
        refreshToken: null,
        auth: false,
    
        userRequest: true,
        userFailed: false
    })
})

it('request user should be success', () => {
    let action: TUserActions = userSuccessRequestAC('admin','admin@mail.ru')

    let state:TUserInitialState = {
        name: null,
        email: null,
        password: null,
        token: null,
        refreshToken: null,
        auth: false,
    
        userRequest: true,
        userFailed: false
    }

    let newState = userReducer(state, action);
    
    expect(newState).toEqual({
        name: 'admin',
        email: 'admin@mail.ru',
        password: null,
        token: null,
        refreshToken: null,
        auth: true,
    
        userRequest: false,
        userFailed: false
    })
})

it('request user should be failed', () => {
    let action: TUserActions = userFailedRequestAC()

    let state:TUserInitialState = {
        name: null,
        email: null,
        password: null,
        token: null,
        refreshToken: null,
        auth: false,
    
        userRequest: true,
        userFailed: false
    }

    let newState = userReducer(state, action);
    
    expect(newState).toEqual({
        name: null,
        email: null,
        password: null,
        token: null,
        refreshToken: null,
        auth: false,
    
        userRequest: false,
        userFailed: true
    })
})

it('user data should be getted', () => {
    let action: TUserActions = setUserDataAC('admin', 'admin@mail.ru', 'qwerty123', 'Bearer token', 'refresh token')

    let state:TUserInitialState = {
        name: null,
        email: null,
        password: null,
        token: null,
        refreshToken: null,
        auth: false,
    
        userRequest: false,
        userFailed: false
    }

    let newState = userReducer(state, action);
    
    expect(newState).toEqual({

        name: 'admin',
        email: 'admin@mail.ru',
        password: 'qwerty123',
        token: 'Bearer token',
        refreshToken: 'refresh token',
        auth: true,
    
        userRequest: false,
        userFailed: false
    })
})

it('user data should be clear', () => {
    let action: TUserActions = clearUserDataAC()

    let state:TUserInitialState = {
        name: 'admin',
        email: 'admin@mail.ru',
        password: null,
        token: null,
        refreshToken: null,
        auth: true,
    
        userRequest: false,
        userFailed: false
    }

    let newState = userReducer(state, action);
    
    expect(newState).toEqual({
        name: null,
        email: null,
        password: null,
        token: null,
        refreshToken: null,
        auth: false,
    
        userRequest: false,
        userFailed: false
    })
})