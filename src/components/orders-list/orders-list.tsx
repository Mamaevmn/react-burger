import { useEffect } from 'react';
import styles from './orders-list.module.css';
import OrderItem from "./order-item/order-item";
import classNames from "classnames";
import { useDispatch, useSelector } from '../../services/hooks';

function OrdersList() {
    const { connected, messages } = useSelector(store => ({
        connected: store.ws.wsConnected,
        messages: store.ws.messages,
    }))

    return (
        connected && messages.orders &&
        <ul className={classNames(styles.list, 'scroll-block', 'pr-2')}>
            {messages.orders.map((order: any) => <OrderItem key={order._id} {...order}/>)}
        </ul>
    )
}

export default OrdersList;