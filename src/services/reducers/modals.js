import { 
    OPEN_MODAL,
    CLOSE_MODAL, 
} from "../actions/modals";

const modalsInitialState = {
    visible: false,
    item: {},
    type: null,
    title: '',
};

export const modalsReducer = (state = modalsInitialState, action) => {
    switch (action.type) {
        case OPEN_MODAL: {
            return {
                ...state,
                visible: true,
                item: {...action.payload.item},
                type: action.payload.type,
                title: action.payload.title,
            }
        }
        case CLOSE_MODAL: {
            return {
                ...state,
                visible: false,
                item: {},
                type: null,
                title: '',
            }
        }
        default: {
            return state;
        }
    }
}