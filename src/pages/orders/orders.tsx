import classNames from 'classnames';

import styles from './orders.module.css';

import ProfileTabs from '../../components/profile-tabs/profile-tabs';

function Orders() {
    return (
        <section className={ classNames(styles.wrapper, 'container')} >
            <ProfileTabs />
            <div className={styles.inner}>
                История заказов
            </div>
        </section>
    )
}

export default Orders