import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';
import totalStyle from './burger-constructor-total.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CALCULATE_TOTAL_PRICE } from '../../../services/actions/constructor';
import { getOrder } from '../../../services/actions/order';

function BurgerConstructorTotal() {
    const dispatch = useDispatch();
    const totalPrice = useSelector(store => store.burgerConstructor.totalPrice);

    const { constructorData, bunData } = useSelector(store => ({
        constructorData: store.burgerConstructor.items,
        bunData: store.burgerConstructor.bun
    }));

    useEffect(() => {
        dispatch({ type: CALCULATE_TOTAL_PRICE })
    }, [constructorData, bunData, dispatch])

    function createGoodsIdArray() {
        let idArray = [];

        bunData && idArray.push(bunData._id);
        constructorData.length && constructorData.map(goods => idArray.push(goods._id));
        bunData && idArray.push(bunData._id);

        return idArray;
    }

    const makeOrder = () => {
        const orderIdArray = createGoodsIdArray();
        dispatch(getOrder(orderIdArray))
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