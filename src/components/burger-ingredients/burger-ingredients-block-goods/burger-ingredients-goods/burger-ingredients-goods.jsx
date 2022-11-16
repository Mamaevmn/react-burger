import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';

import classNames from 'classnames';
import goodsStyle from './burger-ingredients-goods.module.css';
import { goodsPropTypes, INGREDIENTS_DETAIL_MODAL_TITLE, INGREDIENTS_TYPE } from '../../../../utils/const';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { OPEN_MODAL } from '../../../../services/actions/modals';

function BurgerGoods({ goods }) {
    const dispatch = useDispatch();
    const location = useLocation();

    const [{ opacity }, ingredientRef] = useDrag({
        type: 'items',
        item: { ...goods },
        collect: monitor => ({
          opacity: monitor.isDragging() ? 'opacity' : ''
        })
    });

    const onOpenModal = () => dispatch({ type: OPEN_MODAL, payload: {
        type: INGREDIENTS_TYPE,
        title: INGREDIENTS_DETAIL_MODAL_TITLE
    }})

    return (
        <li className={`${goodsStyle.item} ${opacity && goodsStyle.opacity}`} onClick={onOpenModal} ref={ingredientRef}>
            <Link className='text text_color_primary'
                to={{
                    pathname: `/ingredients/${goods._id}`,
                    state: {
                        background: location
                    }
                }}>
                { !!goods.counter && <Counter count={goods.counter} size="default" /> }
                <img className='pl-4 pr-4' src={goods.image} alt="" />
                <p className={classNames(goodsStyle.price, 'text_type_main-medium', 'mb-1', 'mt-1')}>
                    <span className='mr-2'>
                        {goods.price}
                    </span>
                    <CurrencyIcon type="primary" />
                </p>
                <p className={classNames(goodsStyle.name, 'text_type_main-default')}>
                    { goods.name }                           
                </p>
            </Link>
        </li>
    )
}

BurgerGoods.propTypes = {
    goods: goodsPropTypes.isRequired,
}

export default BurgerGoods;