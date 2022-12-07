import { useEffect } from 'react';
import classNames from 'classnames';

import styles from './feed.module.css';

import OrdersList from "../../components/orders-list/orders-list";
import FeedInfo from "../../components/feed-info/feed-info";
import { useDispatch, useSelector } from '../../services/hooks';
import Loader from '../../components/loader/loader';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/constants';
import { WS_URL } from '../../utils/api';

function Feed() {
    const dispatch = useDispatch();
    const { isConnected, messages } = useSelector(store => ({
        isConnected: store.ws.wsConnected,
        messages: store.ws.messages,
    }))

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, payload: WS_URL })
        return () => {isConnected && dispatch({ type: WS_CONNECTION_CLOSED })}
    }, [dispatch, isConnected]);

    return (
        !isConnected && !messages.orders ?
            <Loader /> :
            <section className={classNames(styles.wrapper, 'container')} >
                <OrdersList />
                <FeedInfo />
            </section>
    )
}

export default Feed