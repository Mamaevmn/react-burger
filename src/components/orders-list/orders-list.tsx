import styles from './orders-list.module.css';
import OrderItem from "./order-item/order-item";
import classNames from "classnames";
import { useSelector } from '../../services/hooks';
import { IOrder } from '../../services/types/data';

function OrdersList() {
    const { connected, messages } = useSelector(store => ({
        connected: store.ws.wsConnected,
        messages: store.ws.messages,
    }))

    return (
        connected && messages.orders &&
        <ul className={classNames(styles.list, 'scroll-block', 'pr-2')}>
            {messages.orders.map((order: IOrder) => <OrderItem key={order._id} {...order}/>)}
        </ul>
    )
}

export default OrdersList;