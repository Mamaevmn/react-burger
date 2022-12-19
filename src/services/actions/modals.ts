import { CLOSE_MODAL, OPEN_MODAL } from "../constants";
import { TModalTypes } from "../types/data";

export interface IOpenModalAC {
    readonly type: typeof OPEN_MODAL;
    readonly payload?: TModalTypes;
}

export interface ICloseModalAC {
    readonly type: typeof CLOSE_MODAL;
}

export type TModalsActions = 
    | IOpenModalAC
    | ICloseModalAC

export function openModalAC(): IOpenModalAC {
    return { type: OPEN_MODAL }
}

export function closeModalAC(): ICloseModalAC {
    return { type: CLOSE_MODAL }
}