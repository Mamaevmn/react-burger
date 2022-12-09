import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import MediaQuery from "react-responsive";
import { v4 as uuidv4 } from 'uuid';

import classNames from 'classnames';
import styles from './burger-ingredients-goods.module.css';
import { BUN_TYPE, INGREDIENTS_TYPE } from '../../../../utils/const';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ADD_BUN, ADD_INGREDIENT, INCREASE_ITEM_COUNT, OPEN_MODAL } from '../../../../services/constants';
import {useDispatch} from "../../../../services/hooks";
import { ILocation, TFullIngredient } from '../../../../services/types/data';

const BurgerGoods: FC<TFullIngredient> = ({ ...goods }) => {
    const dispatch = useDispatch();
    const location = useLocation<ILocation>();
    const [{ opacity }, ingredientRef] = useDrag({
        type: 'items',
        item: { ...goods },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 'opacity' : ''
        })
    });

    const onOpenModal = () => dispatch({ type: OPEN_MODAL, payload: INGREDIENTS_TYPE});

    const addIngredient = () => {
        if (goods.type === BUN_TYPE) {
            dispatch({ type: ADD_BUN, payload: goods });
            dispatch({ type: INCREASE_ITEM_COUNT, payload: goods._id });
            return
        }
        
        dispatch({ type: ADD_INGREDIENT, payload: {
            ...goods,
            u_id: uuidv4(),
        } })
        dispatch({ type: INCREASE_ITEM_COUNT, payload: goods._id })
    }

    return (
        <li className={`${styles.item} ${opacity && styles.opacity}`} ref={ingredientRef}>
            <Link className='text text_color_primary'
                to={{
                    pathname: `/ingredients/${goods._id}`,
                    state: {
                        background: location
                    }
                }} onClick={onOpenModal}>
                { !!goods.counter && <Counter count={goods.counter} size="default" /> }
                <img className={classNames(styles.image, 'pl-4', 'pr-4')} src={goods.image} alt="" />
                <p className={classNames(styles.price, 'text_type_main-medium', 'mb-1', 'mt-1')}>
                    <span className='mr-2 text_type_digits-default'>
                        {goods.price}
                    </span>
                    <CurrencyIcon type="primary" />
                </p>
                <p className={classNames(styles.name, 'text_type_main-default')}>
                    { goods.name }                           
                </p>
            </Link>
            <MediaQuery maxWidth={767} >
                <button className={classNames(styles.add_btn, 'text_type_main-small', 'text_color_accent')} onClick={addIngredient}>
                    Добавить
                </button>
            </MediaQuery>
        </li>
    )
}

export default BurgerGoods;