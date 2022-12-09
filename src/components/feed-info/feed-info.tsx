import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useSelector } from '../../services/hooks';
import { IOrder } from '../../services/types/data';

import styles from './feed-info.module.css';

function FeedInfo() {
    const messages = useSelector(store => store.ws.messages);
    const [doneArray, setDoneArray] = useState([]);
    const [pendingArray, setPendingArray] = useState([]);

    useEffect(() => {
        if (messages.orders) {
            setDoneArray(messages.orders.map((order: IOrder) => order.status === 'done' && order))
            setPendingArray(messages.orders.map((order: IOrder) => order.status !== 'done' && order))
        }
    }, [messages])

    return (
        messages.orders &&
        <section>
            <div className={classNames(styles.status, 'mb-15')}>
                <div>
                    <h3 className={classNames(styles.text,'text', 'text_type_main-medium', 'mb-6')}>
                        Готовы:
                    </h3>
                    <ul className={styles.orders}>
                        {doneArray.map((item, idx: number) => item && idx < 11 &&
                            <li key={item._id} className={classNames(styles.order_number, 'text', 'text_type_digits-default', 'text_color_success')}>
                                {item.number}
                            </li>
                        )}
                    </ul>
                </div>
                <div>
                    <h3 className={classNames(styles.text,'text', 'text_type_main-medium', 'mb-6')}>
                        В работе:
                    </h3>
                    <ul className={styles.orders}>
                        {pendingArray.map((item, idx: number) => item && idx < 11 &&
                            <li key={item._id} className={classNames(styles.order_number, 'text', 'text_type_digits-default')}>
                                {item.number}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <p className={classNames(styles.text, 'text', 'text_type_main-medium')}>
                Выполнено за все время:
            </p>
            <p className={classNames(styles.count_number, 'text', 'text_type_digits-large', 'mb-15')}>
                {messages.total}
            </p>
            <p className={classNames(styles.text,'text', 'text_type_main-medium')}>
                Выполнено за сегодня:
            </p>
            <p className={classNames(styles.count_number, 'text', 'text_type_digits-large')}>
                {messages.totalToday}
            </p>
        </section>
    )
}

export default FeedInfo