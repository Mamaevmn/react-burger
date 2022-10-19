import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';

import classNames from 'classnames';
import goodsStyle from './burger-ingredients-goods.module.css';
import { goodsPropTypes, INGREDIENTS_DETAIL_MODAL_TITLE, INGREDIENTS_TYPE } from '../../../../utils/const';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { OPEN_MODAL } from '../../../../services/actions/modals';

function BurgerGoods({ goods }) {
    const dispatch = useDispatch();

    const [{ opacity }, ingredientRef] = useDrag({
        type: 'items',
        item: { ...goods },
        collect: monitor => ({
          opacity: monitor.isDragging() ? 'opacity' : ''
        })
    });

    const onOpenModal = () => dispatch({ type: OPEN_MODAL, payload: {
        item: goods,
        type: INGREDIENTS_TYPE,
        title: INGREDIENTS_DETAIL_MODAL_TITLE
    }})

    return (
        <li className={`${goodsStyle.item} ${opacity && goodsStyle.opacity}`} onClick={onOpenModal} ref={ingredientRef}>
            { !!goods.__v && <Counter count={goods.__v} size="default" /> }
            <img className='pl-4 pr-4' src={goods.image} alt="" />
            <p className={classNames(goodsStyle.price, 'text', 'text_type_main-medium', 'mb-1', 'mt-1')}>
                <span className='mr-2'>
                    {goods.price}
                </span>
                <CurrencyIcon type="primary" />
            </p>
            <p className={classNames(goodsStyle.name, 'text', 'text_type_main-default')}>
                { goods.name }                           
            </p>
        </li>
    )
}

BurgerGoods.propTypes = {
    goods: goodsPropTypes,
}

export default BurgerGoods;