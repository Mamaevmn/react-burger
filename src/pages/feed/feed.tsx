import classNames from 'classnames';

import styles from './feed.module.css';

import OrdersList from "../../components/orders-list/orders-list";
import FeedInfo from "../../components/feed-info/feed-info";
import { useSelector } from '../../services/hooks';
import Loader from '../../components/loader/loader';

function Feed() {
    const { connected, messages } = useSelector(store => ({
        connected: store.ws.wsConnected,
        messages: store.ws.messages,
    }))

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