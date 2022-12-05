import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './modal-order-info.module.css'
import classNames from "classnames";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "../../services/hooks";
import { TFullIngredient } from '../../utils/types';
import Loader from '../loader/loader';

function ModalOrderInfo() {
    const { id } = useParams<{ id?: string }>();
    const [ order, setOrder ] = useState<any>({})

    const { modalVisible, messages, connected, ingredients } = useSelector(store => ({
        modalVisible: store.modals.visible,
        connected: store.ws.wsConnected,
        messages: store.ws.messages,
        ingredients: store.ingredients.items
    }));

    useEffect(() => {
        if (connected && messages.orders) setOrder(messages.orders.find((order: any) => +id === order.number));
    }, [connected, messages, order])

    const translateStatus = (status: string): string => {
        let translate;
        switch (status) {
            case 'done':
                translate = 'Выполнен'
                break;
            default:
                translate = status
                break
        }

        return translate;
    }

    // const findMatchIngredient = () => order.ingredients.map((id: string) => ingredients.find((ingredient: TFullIngredient) => ingredient._id === id))

    if (order && ingredients) console.log(order.ingredients);
    
    return (
        connected && messages.orders && order ?
        <div className={classNames(classNames(styles.wrapper, modalVisible && styles.modal))}>
            <p className={classNames(styles.number, modalVisible && styles.modal_title, 'text', 'text_type_digits-default', 'mb-10')}>
                #{ id }
            </p>
            <h3 className={classNames('text', 'text_type_main-medium', 'mb-3')}>
                {order.name}
            </h3>
            <p className={classNames('text', 'text_type_main-default', 'mb-6', order.status === 'done' && 'text_color_success')}>
                { translateStatus(order.status)}
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
                    <FormattedDate date={new Date(order.createdAt)} />
                </span>
                <p className={classNames(styles.text, 'text', 'text_type_digits-default', 'ml-2')}>
                    <span className='mr-2'>
                        480
                        
                    </span>
                    <CurrencyIcon type="primary" />
                </p>
            </div>
        </div> : <Loader />
    )
}

export default ModalOrderInfo;