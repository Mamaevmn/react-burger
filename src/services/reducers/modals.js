import { 
    OPEN_MODAL,
    CLOSE_MODAL, 
} from "../actions/modals";

const modalsInitialState = {
    visible: false,
    type: null,
};

export const modalsReducer = (state = modalsInitialState, action) => {
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
                type: null,
                title: '',
            }
        }
        default: {
            return state;
        }
    }
}