import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from './modal-order-info.module.css'
import classNames from "classnames";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/hooks";
import Loader from '../loader/loader';
import { ILocation, IOrder, TFullIngredient } from '../../services/types/data';
import { WS_CONNECTION_START } from '../../services/constants';
import { WS_URL_ORDERS, WS_URL_ORDERS_ALL } from '../../utils/api';
import { getCookie } from '../../utils/cookie';
import { translateStatus } from '../../utils/const';

function ModalOrderInfo() {
    const dispatch = useDispatch();
    const location = useLocation<ILocation>()
    const background = location.state && location.state.background;
    const { id } = useParams<{ id?: string }>();
    const [order, setOrder] = useState<any>({})
    const [orderСompound, setOrderСompound] = useState<any>([])

    const { modalVisible, messages, connected, ingredients, userAuth } = useSelector(store => ({
        modalVisible: store.modals.visible,
        connected: store.ws.wsConnected,
        messages: store.ws.messages,
        ingredients: store.ingredients.items,
        userAuth: store.user.auth
    }));

    useEffect(() => {
        if (location.pathname.includes('feed') && !connected) dispatch({ type: WS_CONNECTION_START, payload: WS_URL_ORDERS_ALL })
        if (location.pathname.includes('orders') && userAuth && !connected) dispatch({ type: WS_CONNECTION_START, payload: `${WS_URL_ORDERS}?token=${getCookie('token')}` })
    }, [dispatch, connected, location, userAuth]);

    const findMatchIngredient = useCallback(() => order.ingredients.map((id: string) => ingredients.find((ingredient: TFullIngredient) => ingredient._id === id)), [order.ingredients, ingredients])

    useEffect(() => {
        if (connected && messages.orders) setOrder(messages.orders.find((order: IOrder) => +id === order.number));
        if (Object.keys(order).length > 0) setOrderСompound(Array.from(new Set(findMatchIngredient())));
    }, [connected, messages, order, id, findMatchIngredient])

    return (
        Object.keys(order).length > 0 ?
            <div className={classNames(classNames(styles.wrapper, background && styles.modal))}>
                <p className={classNames(styles.number, background && styles.modal_title, 'text', 'text_type_digits-default', 'mb-10')}>
                    #{id}
                </p>
                <h3 className={classNames('text', 'text_type_main-medium', 'mb-3')}>
                    {order.name}
                </h3>
                <p className={classNames('text', 'text_type_main-default', 'mb-6', order.status === 'done' && 'text_color_success')}>
                    {translateStatus(order.status)}
                </p>
                <p className={classNames('text', 'text_type_main-medium', 'mb-6')}>
                    Состав:
                </p>
                <ul className={classNames(styles.ingredients, 'mb-10', background && orderСompound.length > 3 && 'pr-6', background && orderСompound.length > 3 && 'scroll-block', !modalVisible && 'mh-none')}>
                    {orderСompound.map((item: TFullIngredient) => <li key={item._id} className={styles.ingredient}>
                            <div className={classNames(styles.img_wrapper, 'mr-4')}>
                                <img src={item.image_mobile} alt={item.name} title={item.name} />
                            </div>
                            <p className={classNames('text', 'text_type_main-default')}>
                                {item.name}
                            </p>
                            <p className={classNames(styles.text, styles.price, 'text', 'text_type_digits-default', 'ml-2')}>
                                <span className='mr-2'>
                                    {order.ingredients.filter((id: string) => id === item._id).length} x {item.price}
                                </span>
                                <CurrencyIcon type="primary" />
                            </p>
                        </li>
                    )}
                </ul>
                <div className={styles.footer}>
                    <span className={classNames(styles.date, 'text', 'text_type_main-default', 'text_color_inactive')}>
                        <FormattedDate date={new Date(order.createdAt)} />
                    </span>
                    <p className={classNames(styles.text, 'text', 'text_type_digits-default', 'ml-2')}>
                        <span className='mr-2'>
                            {findMatchIngredient().reduce((accumulator: number, item: TFullIngredient) => accumulator + item.price, 0)}
                        </span>
                        <CurrencyIcon type="primary" />
                    </p>
                </div>
            </div> : <Loader />
    )
}

export default ModalOrderInfo;