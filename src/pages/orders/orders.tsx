import { useEffect } from 'react';
import classNames from 'classnames';

import styles from './orders.module.css';

import ProfileTabs from '../../components/profile-tabs/profile-tabs';
import OrdersList from "../../components/orders-list/orders-list";
import { useDispatch, useSelector } from '../../services/hooks';
import { WS_CONNECTION_START } from '../../services/constants';
import { WS_URL_ORDERS } from '../../utils/api';
import Loader from '../../components/loader/loader';
import { getCookie } from '../../utils/cookie';

function Orders() {
    const dispatch = useDispatch();
    const { isConnected, messages, userAuth } = useSelector(store => ({
        isConnected: store.ws.wsConnected,
        messages: store.ws.messages,
        userAuth: store.user.auth
    }))

    useEffect(() => {
        if (userAuth) dispatch({ type: WS_CONNECTION_START, payload: `${WS_URL_ORDERS}?token=${getCookie('token')}` })
    }, [dispatch, userAuth]);

    return (
        <section className={ classNames(styles.wrapper, 'container')} >
            <ProfileTabs />
            {!isConnected && !messages.orders ?
                <Loader /> :
                <OrdersList />
            }
        </section>
    )
}

export default Orders