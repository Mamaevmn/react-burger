import { TOrderActions } from "../actions/order";
import {
    GET_ORDER_FAILED,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
} from "../constants";

export type TOrderInitialState = {
    orderNumber: number,
    orderRequest: boolean,
    orderFailed: boolean,
};

const orderInitialState: TOrderInitialState = {
    orderNumber: null,
    orderRequest: false,
    orderFailed: false,
};

export const orderReducer = (
    state = orderInitialState,
    action: TOrderActions
) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                orderNumber: action.payload,
                orderRequest: false,
                orderFailed: false,
            };
        }
        case GET_ORDER_FAILED: {
            return { ...state, orderFailed: true, orderRequest: false };
        }
        default: {
            return state;
        }
    }
}