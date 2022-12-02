import styles from './order-item.module.css';
import classNames from "classnames";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation} from "react-router-dom";
import {OPEN_MODAL} from "../../../services/constants";
import {ORDER_INFO_TYPE} from "../../../utils/const";
import {useDispatch} from "../../../services/hooks";

function OrderItem() {
    const dispatch = useDispatch()
    const location = useLocation()
    const id = '034535'

    const onOpenModal = () => dispatch({ type: OPEN_MODAL, payload: ORDER_INFO_TYPE})

    return(
        <li onClick={onOpenModal}>
            <Link className={classNames(styles.item, 'p-6', 'text_color_primary')}
                to={{
                    pathname: `${location.pathname}/${id}`,
                    state: {
                        background: location
                    }
                }}
            >
                <span className={classNames(styles.date, 'text', 'text_type_main-default', 'text_color_inactive')}>
                    Сегодня, 16:20
                </span>
                <p className={classNames('text', 'text_type_digits-default', 'mb-6')}>
                    #{ id }
                </p>
                <h3 className={classNames('text', 'text_type_main-medium', 'mb-2')}>
                    Death Star Starship Main бургер
                </h3>
                <p className={classNames('text', 'text_type_main-default', 'mb-6')}>
                    Создан
                </p>
                <div className={styles.footer}>
                    <ul className={styles.ingredients}>
                        <li className={styles.ingredient}></li>
                        <li className={styles.ingredient}></li>
                        <li className={styles.ingredient}></li>
                        <li className={styles.ingredient}></li>
                        <li className={styles.ingredient}></li>
                    </ul>
                    <p className={classNames(styles.text, 'text', 'text_type_digits-default', 'ml-6')}>
                        <span className='mr-2'>
                            480
                        </span>
                        <CurrencyIcon type="primary" />
                    </p>
                </div>
            </Link>
        </li>
    )
}

export  default  OrderItem;