import classNames from 'classnames';

import styles from './feed.module.css';

import OrdersList from "../../components/orders-list/orders-list";
import FeedInfo from "../../components/feed-info/feed-info";
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { WS_CONNECTION_START } from '../../services/constants';
import Loader from '../../components/loader/loader';

function Feed() {
    const dispatch = useDispatch();
    const { connected, messages } = useSelector(store => ({
        connected: store.ws.wsConnected,
        messages: store.ws.messages,
    }))
    
    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START });
    }, [dispatch, connected])

    return (
        !connected && !messages.orders ?
            <Loader /> :
            <section className={classNames(styles.wrapper, 'container')} >
                <OrdersList />
                <FeedInfo />
            </section>
    )
}

export default Feed