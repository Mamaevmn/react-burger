import styles from './modal-order-info.module.css'
import classNames from "classnames";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "../../services/hooks";

function ModalOrderInfo() {
    const modalVisible = useSelector(store => store.modals.visible);

    return (
        <div className={classNames(classNames(styles.wrapper, modalVisible && styles.modal))}>
            <p className={classNames(styles.number, modalVisible && styles.modal_title, 'text', 'text_type_digits-default', 'mb-10')}>
                #034535
            </p>
            <h3 className={classNames('text', 'text_type_main-medium', 'mb-3')}>
                Black Hole Singularity острый бургер
            </h3>
            <p className={classNames('text', 'text_type_main-default', 'mb-15')}>
                Создан
            </p>
            <p className={classNames('text', 'text_type_main-medium', 'mb-6')}>
                Состав:
            </p>
            <ul className={classNames(styles.ingredients, 'scroll-block', 'mb-10', 'pr-6')}>
                <li className={styles.ingredient}>
                    <div className={classNames(styles.img_wrapper, 'mr-4')}>
                        <img src="" alt=""/>
                    </div>
                    <p className={classNames('text', 'text_type_main-default')}>
                        Флюоресцентная булка R2-D3
                    </p>
                    <p className={classNames(styles.text, styles.price, 'text', 'text_type_digits-default', 'ml-2')}>
                    <span className='mr-2'>
                        1 x 20
                    </span>
                        <CurrencyIcon type="primary" />
                    </p>
                </li><li className={styles.ingredient}>
                <div className={classNames(styles.img_wrapper, 'mr-4')}>
                    <img src="" alt=""/>
                </div>
                <p className={classNames('text', 'text_type_main-default')}>
                    Флюоресцентная булка R2-D3
                </p>
                <p className={classNames(styles.text, styles.price, 'text', 'text_type_digits-default', 'ml-2')}>
                    <span className='mr-2'>
                        1 x 20
                    </span>
                    <CurrencyIcon type="primary" />
                </p>
            </li><li className={styles.ingredient}>
                <div className={classNames(styles.img_wrapper, 'mr-4')}>
                    <img src="" alt=""/>
                </div>
                <p className={classNames('text', 'text_type_main-default')}>
                    Флюоресцентная булка R2-D3
                </p>
                <p className={classNames(styles.text, styles.price, 'text', 'text_type_digits-default', 'ml-2')}>
                    <span className='mr-2'>
                        1 x 20
                    </span>
                    <CurrencyIcon type="primary" />
                </p>
            </li><li className={styles.ingredient}>
                <div className={classNames(styles.img_wrapper, 'mr-4')}>
                    <img src="" alt=""/>
                </div>
                <p className={classNames('text', 'text_type_main-default')}>
                    Флюоресцентная булка R2-D3
                </p>
                <p className={classNames(styles.text, styles.price, 'text', 'text_type_digits-default', 'ml-2')}>
                    <span className='mr-2'>
                        1 x 20
                    </span>
                    <CurrencyIcon type="primary" />
                </p>
            </li><li className={styles.ingredient}>
                <div className={classNames(styles.img_wrapper, 'mr-4')}>
                    <img src="" alt=""/>
                </div>
                <p className={classNames('text', 'text_type_main-default')}>
                    Флюоресцентная булка R2-D3
                </p>
                <p className={classNames(styles.text, styles.price, 'text', 'text_type_digits-default', 'ml-2')}>
                    <span className='mr-2'>
                        1 x 20
                    </span>
                    <CurrencyIcon type="primary" />
                </p>
            </li><li className={styles.ingredient}>
                <div className={classNames(styles.img_wrapper, 'mr-4')}>
                    <img src="" alt=""/>
                </div>
                <p className={classNames('text', 'text_type_main-default')}>
                    Флюоресцентная булка R2-D3
                </p>
                <p className={classNames(styles.text, styles.price, 'text', 'text_type_digits-default', 'ml-2')}>
                    <span className='mr-2'>
                        1 x 20
                    </span>
                    <CurrencyIcon type="primary" />
                </p>
            </li>
            </ul>
            <div className={styles.footer}>
                <span className={classNames(styles.date, 'text', 'text_type_main-default', 'text_color_inactive')}>
                    Сегодня, 16:20
                </span>
                <p className={classNames(styles.text, 'text', 'text_type_digits-default', 'ml-2')}>
                    <span className='mr-2'>
                        480
                    </span>
                    <CurrencyIcon type="primary" />
                </p>
            </div>
        </div>
    )
}

export default ModalOrderInfo;