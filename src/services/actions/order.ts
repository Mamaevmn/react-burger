import { postOrder } from "../../utils/api";
import { 
    GET_ORDER_FAILED, 
    GET_ORDER_REQUEST, 
    GET_ORDER_SUCCESS, 
    OPEN_MODAL 
} from "../constants";
import { AppThunk } from "../types";

export interface IOrderRequestAC {
    readonly type: typeof GET_ORDER_REQUEST;
}

export interface IOrderSuccessRequestAC {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly payload: number
}

export interface IOrderFailedRequestAC {
    readonly type: typeof GET_ORDER_FAILED;
}

export interface IOpenModalAC {
    readonly type: typeof OPEN_MODAL;
    readonly payload: 'order'
}

export type TOrderActions =
    | IOrderRequestAC
    | IOrderSuccessRequestAC
    | IOrderFailedRequestAC
    | IOpenModalAC;

function orderRequestAC() {
    return { type: GET_ORDER_REQUEST }
}

function orderSuccessRequestAC(number: number) {
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

export const getOrder: AppThunk = (array) => (dispatch: AppThunk) => {
        dispatch(orderRequestAC());
        postOrder(array).then(res => {
            dispatch(orderSuccessRequestAC(res.order.number));
            dispatch(openModalAC())
        }).catch(() => dispatch(orderFailedRequestAC()));
    };
