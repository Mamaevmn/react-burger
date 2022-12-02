import classNames from 'classnames';

import styles from './feed-info.module.css';

function FeedInfo() {
    return (
        <section>
            <div className={classNames(styles.status, 'mb-15')}>
                <div>
                    <h3 className={classNames('text', 'text_type_main-medium', 'mb-6')}>
                        Готовы:
                    </h3>
                    <ul>
                        <li className={classNames(styles.order_number, 'text', 'text_type_digits-default', 'text_color_success')}>
                            034533
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className={classNames('text', 'text_type_main-medium', 'mb-6')}>
                        В работе:
                    </h3>
                    <ul>
                        <li className={classNames(styles.order_number, 'text', 'text_type_digits-default')}>
                            034538
                        </li>
                    </ul>
                </div>
            </div>
            <p className={classNames('text', 'text_type_main-medium')}>
                Выполнено за все время:
            </p>
            <p className={classNames(styles.count_number, 'text', 'text_type_digits-large', 'mb-15')}>
                28 752
            </p>
            <p className={classNames('text', 'text_type_main-medium')}>
                Выполнено за сегодня:
            </p>
            <p className={classNames(styles.count_number, 'text', 'text_type_digits-large')}>
                138
            </p>
        </section>
    )
}

export default FeedInfo