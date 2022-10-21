import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import classNames from 'classnames';
import ingredientsStyle from './burger-ingredients.module.css';
import Tabs from './burger-ingredients-tabs/burger-ingredients-tabs';
import BurgerIngredientsTypes from './burger-ingredients-block-goods/burger-ingredients-block-goods';

import { getIngredients } from '../../services/actions/ingredients';

function BurgerIngredients() {
    const dispatch = useDispatch();

    useEffect(() => { dispatch(getIngredients()) }, [dispatch]);

    return (
        <section className={classNames(ingredientsStyle.section)}>
            <h1 className="text text_type_main-large mb-5">
                Соберите бургер
            </h1>
            <Tabs />
            <BurgerIngredientsTypes />
        </section>
    )
}

export default BurgerIngredients