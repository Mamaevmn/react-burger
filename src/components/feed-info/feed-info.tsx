import classNames from 'classnames';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useSelector } from '../../services/hooks';

import styles from './feed-info.module.css';

function FeedInfo() {
    const messages = useSelector(store => store.ws.messages);
    const [doneArray, setDoneArray] = useState<any>([]);
    const [pendingArray, setPendingArray] = useState<any>([]);

    useEffect(() => {
        if (messages.orders) {
            setDoneArray(messages.orders.map((item: any) => item.status === 'done' && item))
            setPendingArray(messages.orders.map((item: any) => item.status !== 'done' && item))
        }
    }, [messages])

    return (
        messages.orders &&
        <section>
            <div className={classNames(styles.status, 'mb-15')}>
                <div>
                    <h3 className={classNames('text', 'text_type_main-medium', 'mb-6')}>
                        Готовы:
                    </h3>
                    <ul className={styles.orders}>
                        {doneArray.map((item: any, idx: number) => idx < 11 &&
                            <li key={nanoid()} className={classNames(styles.order_number, 'text', 'text_type_digits-default', 'text_color_success')}>
                                {item.number}
                            </li>
                        )}
                    </ul>
                </div>
                <div>
                    <h3 className={classNames('text', 'text_type_main-medium', 'mb-6')}>
                        В работе:
                    </h3>
                    <ul className={styles.orders}>
                        {pendingArray.map((item: any, idx: number) => idx < 11 &&
                            <li key={nanoid()} className={classNames(styles.order_number, 'text', 'text_type_digits-default')}>
                                {item.number}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <p className={classNames('text', 'text_type_main-medium')}>
                Выполнено за все время:
            </p>
            <p className={classNames(styles.count_number, 'text', 'text_type_digits-large', 'mb-15')}>
                {messages.total}
            </p>
            <p className={classNames('text', 'text_type_main-medium')}>
                Выполнено за сегодня:
            </p>
            <p className={classNames(styles.count_number, 'text', 'text_type_digits-large')}>
                {messages.totalToday}
            </p>
        </section>
    )
}

export default FeedInfo