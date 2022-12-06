import type { Middleware, MiddlewareAPI } from 'redux';
import { 
    WS_CONNECTION_START, 
    WS_CONNECTION_SUCCESS, 
    WS_CONNECTION_ERROR, 
    WS_GET_MESSAGE, 
    WS_CONNECTION_CLOSED,
    WS_SEND_MESSAGE, 
} from '../constants';
import { RootState } from '../store';
import { AppDispatch, TApplicationActions } from '../types';

export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch | any, RootState>) => {
        let socket: WebSocket = null;

        return next => (action: TApplicationActions | any) => {
            const { dispatch } = store;
            const { type, payload } = action;

            if (type === WS_CONNECTION_START) {
                // объект класса WebSocket
                socket = new WebSocket(payload);
            }
            if (socket) {
                // функция, которая вызывается при открытии сокета
                socket.onopen = () => {dispatch({ type: WS_CONNECTION_SUCCESS })};
                // функция, которая вызывается при ошибке соединения
                socket.onerror = event => {dispatch({ type: WS_CONNECTION_ERROR, payload: event })};
                // функция, которая вызывается при получения события от сервера
                socket.onmessage = event => {
                    const data = JSON.parse(event.data);
                    dispatch({ type: WS_GET_MESSAGE, payload: data });
                };
                // функция, которая вызывается при закрытии соединения
                socket.onclose = () => {dispatch({ type: WS_CONNECTION_CLOSED })};

                if (type === WS_SEND_MESSAGE) {
                    const message = payload;
                    // функция для отправки сообщения на сервер
                    socket.send(JSON.stringify(message));
                }
            }
            
            next(action);
        };
    }) as Middleware;
};