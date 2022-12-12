import { TWSActions } from "../actions/use-socket";
import { 
    WS_CONNECTION_CLOSED, 
    WS_CONNECTION_ERROR, 
    WS_CONNECTION_SUCCESS, 
    WS_GET_MESSAGE 
} from "../constants";

type TWSState = {
    wsConnected: boolean;
    messages: any;

    error?: Event;
}

const WSinitialState: TWSState = {
    wsConnected: false,
    messages: []
};

export const wsReducer = (state = WSinitialState, action: TWSActions): TWSState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                messages: [],
                error: undefined,
                wsConnected: false
            };

        case WS_GET_MESSAGE:
            return {
                ...state,
                error: undefined,
                messages: action.payload
            };
        default:
            return state;
    }
}; 