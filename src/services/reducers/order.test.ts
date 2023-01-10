import { orderFailedRequestAC, orderRequestAC, orderSuccessRequestAC, TOrderActions } from "../actions/order";
import { orderReducer, TOrderInitialState } from "./order";

it('order should be request', () => {
    let action: TOrderActions = orderRequestAC()

    let state:TOrderInitialState = {
        orderNumber: null,
        orderRequest: false,
        orderFailed: false,
    }

    let newState = orderReducer(state, action);
    
    expect(newState).toEqual({
        orderNumber: null,
        orderRequest: true,
        orderFailed: false,
    })
})

it('request order should be success', () => {
    let action: TOrderActions = orderSuccessRequestAC(333)

    let state:TOrderInitialState = {
        orderNumber: null,
        orderRequest: true,
        orderFailed: false,
    }

    let newState = orderReducer(state, action);
    
    expect(newState).toEqual({
        orderNumber: 333,
        orderRequest: false,
        orderFailed: false,
    })
})

it('request order should be failed', () => {
    let action: TOrderActions = orderFailedRequestAC()

    let state:TOrderInitialState = {
        orderNumber: null,
        orderRequest: true,
        orderFailed: false,
    }

    let newState = orderReducer(state, action);
    
    expect(newState).toEqual({
        orderNumber: null,
        orderRequest: false,
        orderFailed: true,
    })
})
