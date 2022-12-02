import { 
    WS_CONNECTION_CLOSED, 
    WS_CONNECTION_ERROR, 
    WS_CONNECTION_START, 
    WS_CONNECTION_SUCCESS, 
    WS_GET_MESSAGE, 
} from "../constants";

export interface IWSConnectionStartAC {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: any
}

export interface IWSConnectionSuccessAC {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    readonly payload: any
}

export interface IWSConnectionErrorAC {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: any
}

export interface IWSConnectionClosedAC {
    readonly type: typeof WS_CONNECTION_CLOSED;
    readonly payload: any
}

export interface IWSGetMessageAC {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: any
}

export type TWSActions =
    | IWSConnectionStartAC
    | IWSConnectionSuccessAC
    | IWSConnectionErrorAC
    | IWSConnectionClosedAC
    | IWSGetMessageAC;