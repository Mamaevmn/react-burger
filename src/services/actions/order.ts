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

export function orderRequestAC(): IOrderRequestAC {
    return { type: GET_ORDER_REQUEST }
}

export function orderSuccessRequestAC(number: number): IOrderSuccessRequestAC {
    return {
        type: GET_ORDER_SUCCESS,
        payload: number,
    }
}

export function orderFailedRequestAC(): IOrderFailedRequestAC {
    return { type: GET_ORDER_FAILED }
}

export function openModalAC(): IOpenModalAC {
    return { 
        type: OPEN_MODAL, 
        payload: 'order'
    }
}

export const postUserOrder: AppThunk = (array) => (dispatch: AppThunk) => {
        dispatch(orderRequestAC());
        postOrder(array).then(res => {
            dispatch(orderSuccessRequestAC(res.order.number));
            dispatch(openModalAC())
        }).catch(() => dispatch(orderFailedRequestAC()));
    };
