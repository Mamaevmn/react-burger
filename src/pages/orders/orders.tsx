import classNames from 'classnames';

import styles from './orders.module.css';

import ProfileTabs from '../../components/profile-tabs/profile-tabs';
import OrdersList from "../../components/orders-list/orders-list";

function Orders() {
    return (
        <section className={ classNames(styles.wrapper, 'container')} >
            <ProfileTabs />
            <OrdersList />
        </section>
    )
}

export default Orders