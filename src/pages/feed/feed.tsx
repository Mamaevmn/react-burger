import classNames from 'classnames';

import styles from './feed.module.css';

import OrdersList from "../../components/orders-list/orders-list";
import FeedInfo from "../../components/feed-info/feed-info";
import {useLocation} from "react-router-dom";

function Feed() {
    const location = useLocation();

    return (
        <section className={ classNames(styles.wrapper, 'container')} >
            <OrdersList />
            <FeedInfo />
        </section>
    )
}

export default Feed