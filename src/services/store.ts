import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

import { compose } from 'redux';
import { socketMiddleware } from './middleware/use-socket';
import { 
    WS_CONNECTION_CLOSED, 
    WS_CONNECTION_ERROR, 
    WS_CONNECTION_START, 
    WS_CONNECTION_SUCCESS, 
    WS_GET_MESSAGE, 
    WS_SEND_MESSAGE 
} from './constants';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const wsActions = {
    wsStart: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};

const enhancer = composeEnhancers(applyMiddleware(
    thunk,
    socketMiddleware(wsActions)
));

export const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>;