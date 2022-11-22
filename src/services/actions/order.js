import { postOrder } from "../../utils/api";
import { OPEN_MODAL } from "./modals";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export function getOrder(array) {
    return function(dispatch) {
        dispatch(orderRequestAC());
        postOrder(array).then(res => {
            dispatch(orderSuccessRequestAC(res.order.number));
            dispatch(openModalAC())
        }).catch(() => dispatch(orderFailedRequestAC()));
    };
}

function orderRequestAC() {
    return { type: GET_ORDER_REQUEST }
}

function orderSuccessRequestAC(number) {
    return {
        type: GET_ORDER_SUCCESS,
        payload: number,
    }
}

function orderFailedRequestAC() {
    return { type: GET_ORDER_FAILED }
}

function openModalAC() {
    return { 
        type: OPEN_MODAL, 
        payload: 'order'
    }
}