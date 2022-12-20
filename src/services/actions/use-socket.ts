import { 
    WS_CONNECTION_CLOSED, 
    WS_CONNECTION_ERROR, 
    WS_CONNECTION_START, 
    WS_CONNECTION_SUCCESS, 
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE, 
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

export interface IWSSendMessageAC {
    readonly type: typeof WS_SEND_MESSAGE;
    readonly payload: any
}

export type TWSActions =
    | IWSConnectionStartAC
    | IWSConnectionSuccessAC
    | IWSConnectionErrorAC
    | IWSConnectionClosedAC
    | IWSGetMessageAC
    | IWSSendMessageAC;

export interface IWSTypeActions {
    wsStart: typeof WS_CONNECTION_START,
    onOpen: typeof WS_CONNECTION_SUCCESS,
    onError: typeof WS_CONNECTION_ERROR,
    onMessage: typeof WS_GET_MESSAGE
    wsSendMessage: typeof WS_SEND_MESSAGE,
    onClose: typeof WS_CONNECTION_CLOSED,
}

export function wSConnectionStartAC(data: any): IWSConnectionStartAC {
    return { 
        type: WS_CONNECTION_START,
        payload: data
    }
}

export function wSConnectionSuccessAC(data: any): IWSConnectionSuccessAC {
    return { 
        type: WS_CONNECTION_SUCCESS,
        payload: data
    }
}

export function wSConnectionErrorAC(data: any): IWSConnectionErrorAC {
    return { 
        type: WS_CONNECTION_ERROR,
        payload: data
    }
}

export function wSConnectionClosedAC(data: any): IWSConnectionClosedAC {
    return { 
        type: WS_CONNECTION_CLOSED,
        payload: data
    }
}

export function wSGetMessageAC(data: any): IWSGetMessageAC {
    return { 
        type: WS_GET_MESSAGE,
        payload: data
    }
}

export function wSSendMessageAC(data: any): IWSSendMessageAC {
    return { 
        type: WS_SEND_MESSAGE,
        payload: data
    }
}