import { TWSActions, wSConnectionClosedAC, wSConnectionErrorAC, wSConnectionStartAC, wSConnectionSuccessAC, wSGetMessageAC } from "../actions/use-socket";
import { TWSState, wsReducer } from "./use-socket";

it('connection ws should be success', () => {
    let action: TWSActions = wSConnectionSuccessAC('connection success')

    let state:TWSState = {
        wsConnected: false,
        messages: []
    }

    let newState = wsReducer(state, action);
    
    expect(newState).toEqual({
        wsConnected: true,
        messages: [],
        error: undefined,
    })
})

it('connection ws should be failed', () => {
    let action: TWSActions = wSConnectionErrorAC('connection error')

    let state:TWSState = {
        wsConnected: true,
        messages: [],
        error: undefined,
    }

    let newState = wsReducer(state, action);
    
    expect(newState).toEqual({
        wsConnected: false,
        messages: [],
        error: 'connection error',
    })
})

it('connection ws should be closed', () => {
    let action: TWSActions = wSConnectionClosedAC('connection closed')

    let state:TWSState = {
        wsConnected: true,
        messages: [
            {
                order: 'order 1'
            },
            {
                order: 'order 2'
            }
        ],
        error: undefined,
    }

    let newState = wsReducer(state, action);
    
    expect(newState).toEqual({
        wsConnected: false,
        messages: [],
        error: undefined,
    })
})

it('ws message should be getted', () => {
    let action: TWSActions = wSGetMessageAC([
        {
            order: 'order 1'
        },
        {
            order: 'order 2'
        }
    ])

    let state:TWSState = {
        wsConnected: true,
        messages: [],
        error: undefined,
    }

    let newState = wsReducer(state, action);
    
    expect(newState).toEqual({
        wsConnected: true,
        messages: [
            {
                order: 'order 1'
            },
            {
                order: 'order 2'
            }
        ],
        error: undefined,
    })
})