import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

import { compose } from 'redux';
import { socketMiddleware } from './middleware/use-socket';
import { WS_URL } from '../utils/api';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(
    thunk,
    socketMiddleware(WS_URL)
));

export const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>;