import styles from './orders-list.module.css';
import OrderItem from "./order-item/order-item";
import classNames from "classnames";

function OrdersList() {
    return (
        <ul className={classNames(styles.list, 'scroll-block', 'pr-2')}>
            <OrderItem />
        </ul>
    )
}

export default OrdersList;