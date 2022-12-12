import { useEffect, useState } from 'react';
import classNames from 'classnames';
import MediaQuery, { useMediaQuery } from "react-responsive";

import styles from './feed.module.css';

import OrdersList from "../../components/orders-list/orders-list";
import FeedInfo from "../../components/feed-info/feed-info";
import { useDispatch, useSelector } from '../../services/hooks';
import Loader from '../../components/loader/loader';
import { WS_CONNECTION_START } from '../../services/constants';
import { WS_URL_ORDERS_ALL } from '../../utils/api';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function Feed() {
    const dispatch = useDispatch();
    const [currentTab, setCurrentTab] = useState('orders')
    const { isConnected, messages } = useSelector(store => ({
        isConnected: store.ws.wsConnected,
        messages: store.ws.messages,
    }))
    const isMobile = useMediaQuery({
        query: "(max-width: 767px)"
    });

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, payload: WS_URL_ORDERS_ALL })
    }, [dispatch]);

    return (
        !isConnected && !messages.orders ?
            <Loader /> :
            <section className={classNames(styles.wrapper, 'container')} >
                <h1 className={classNames(styles.title, 'text', 'text_type_main-large')}>
                Лента заказов
                </h1>
                <MediaQuery maxWidth={767} >
                    <div className={styles.tabs}>
                        <Tab value='orders' active={currentTab === 'orders'} onClick={setCurrentTab}>
                            Заказы
                        </Tab>
                        <Tab value='statistics' active={currentTab === 'statistics'} onClick={setCurrentTab}>
                            Статистика
                        </Tab>
                    </div>
                </MediaQuery>
                {isMobile ?     
                    <>
                        {currentTab === 'orders' ? <OrdersList /> : <FeedInfo />}
                    </> :
                    <>
                        <OrdersList />
                        <FeedInfo />
                    </>
                }
            </section>
    )
}

export default Feed