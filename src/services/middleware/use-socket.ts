import type { Middleware, MiddlewareAPI } from 'redux';
import { IWSTypeActions } from '../actions/use-socket';

import { RootState } from '../store';
import { AppDispatch, TApplicationActions } from '../types';

export const socketMiddleware = (wsActions: IWSTypeActions): Middleware => ((store: MiddlewareAPI<AppDispatch | any, RootState>) => {
        let socket: WebSocket = null;

        return next => (action: TApplicationActions | any) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsStart, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

            if (type === wsStart) {
                socket = new WebSocket(payload);
            }
            if (socket) {
                socket.onopen = () => {dispatch({ type: onOpen })};
                socket.onerror = event => {dispatch({ type: onError, payload: event })};
                socket.onmessage = event => {
                    const data = JSON.parse(event.data);
                    dispatch({ type: onMessage, payload: data });
                };
                socket.onclose = event => { dispatch({ type: onClose, payload: event})};

                if (type === onClose) {
                    console.log('close');
                    
                    socket.close()
                }

                if (type === wsSendMessage) {
                    const message = payload;
                    socket.send(JSON.stringify(message));
                }
            }
            
            next(action);
        };
}) as Middleware;