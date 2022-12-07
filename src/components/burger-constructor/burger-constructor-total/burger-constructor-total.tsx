import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import classNames from 'classnames';
import totalStyle from './burger-constructor-total.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CALCULATE_TOTAL_PRICE, CLEAR_CONSTRUCTOR, CLEAR_ITEMS_COUNT, WS_SEND_MESSAGE } from '../../../services/constants';
import { getOrder } from '../../../services/actions/order';
import {useDispatch, useSelector} from "../../../services/hooks";
import { TFullIngredient } from '../../../services/types/data';

function BurgerConstructorTotal() {
    const dispatch = useDispatch();
    const history = useHistory()
    const { totalPrice, constructorData, bunData, userAuth} = useSelector(store => ({
        totalPrice: store.burgerConstructor.totalPrice,
        constructorData: store.burgerConstructor.items,
        bunData: store.burgerConstructor.bun,
        userAuth: store.user.auth
    }));

    useEffect(() => {
        dispatch({ type: CALCULATE_TOTAL_PRICE })
    }, [constructorData, bunData, dispatch])

    const createGoodsIdArray = () => [bunData?._id && bunData._id, ...constructorData.map((goods: TFullIngredient) => goods._id), bunData?._id && bunData._id];

    const makeOrder = () => {
        if (userAuth) {
            const orderIdArray = createGoodsIdArray();
            dispatch(getOrder(orderIdArray))
            dispatch({type: WS_SEND_MESSAGE, payload: orderIdArray})
            dispatch({ type: CLEAR_CONSTRUCTOR })
            dispatch({ type: CLEAR_ITEMS_COUNT })
        } else {
            history.replace({ pathname: '/login'})
        }
    }

    return (
        (constructorData.length || !!bunData) && 
            <div className={classNames(totalStyle.total, 'pt-10')}>
                <p className={classNames(totalStyle.text, 'text', 'text_type_digits-medium', 'pr-10')}>
                    <span className='mr-2'>
                        { totalPrice }
                    </span>
                    <CurrencyIcon type="primary" />
                </p>
                <Button type="primary" size="large" htmlType="button" onClick={makeOrder}>
                    Оформить заказ
                </Button>
            </div>
    )
}

export default BurgerConstructorTotal