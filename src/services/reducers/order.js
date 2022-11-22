import { 
    GET_ORDER_FAILED, 
    GET_ORDER_REQUEST, 
    GET_ORDER_SUCCESS,
} from "../actions/order";

const orderInitialState = {
    orderNumber: null,
    orderRequest: false,
    orderFailed: false,
};

export const orderReducer = (state = orderInitialState, action) => {
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