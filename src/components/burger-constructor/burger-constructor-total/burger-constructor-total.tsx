import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';
import totalStyle from './burger-constructor-total.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CALCULATE_TOTAL_PRICE, CLEAR_CONSTRUCTOR } from '../../../services/actions/constructor';
import { getOrder } from '../../../services/actions/order';
import { CLEAR_ITEMS_COUNT } from '../../../services/actions/ingredients';
import { TFullIngredient, TIngredientsType } from '../../../utils/types';

type TStore = {
    burgerConstructor: {
        totalPrice: number;
        items: TFullIngredient;
        bun: TIngredientsType;
    },
    user: {
        auth: boolean
    }
}

function BurgerConstructorTotal() {
    const dispatch = useDispatch();
    const history = useHistory()
    const totalPrice: any = useSelector<TStore>(store => store.burgerConstructor.totalPrice);
    const constructorData: any = useSelector<TStore>(store => store.burgerConstructor.items);
    const bunData: any = useSelector<TStore>(store => store.burgerConstructor.bun);
    const userAuth: any = useSelector<TStore>(store => store.user.auth);

    useEffect(() => {
        dispatch({ type: CALCULATE_TOTAL_PRICE })
    }, [constructorData, bunData, dispatch])

    const createGoodsIdArray = () => [bunData?._id && bunData._id, ...constructorData.map((goods: TFullIngredient) => goods._id), bunData?._id && bunData._id];

    const makeOrder = () => {
        if (userAuth) {
            const orderIdArray = createGoodsIdArray();
            dispatch<any>(getOrder(orderIdArray))
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