import { postOrder } from "../../utils/api";
import { OPEN_MODAL } from "./modals";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export function getOrder(array) {
    return function(dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        postOrder(array).then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    payload: res.order.number,
                });
                dispatch({ type: OPEN_MODAL, payload: {type: 'order'} })
            } else {
                dispatch({
                type: GET_ORDER_FAILED
                });
            }
        }).catch(e => {
            dispatch({
                type: GET_ORDER_FAILED
            });
        });
    };
}