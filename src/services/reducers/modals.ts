import { TModalsActions } from "../actions/modals";
import {
    OPEN_MODAL,
    CLOSE_MODAL,
} from "../constants";
import { TModalTypes } from "../types/data";

export type TModalsInitialState = {
    visible: boolean,
    type?: TModalTypes,
};

const modalsInitialState: TModalsInitialState = {
    visible: false,
    type: '',
};

export const modalsReducer = (
    state = modalsInitialState,
    action: TModalsActions
): TModalsInitialState => {
    switch (action.type) {
        case OPEN_MODAL: {
            return {
                ...state,
                visible: true,
                type: action.payload
            }
        }
        case CLOSE_MODAL: {
            window.history.replaceState(null, null, '/')
            return {
                ...state,
                visible: false,
                type: '',
            }
        }
        default: {
            return state;
        }
    }
}