import classNames from 'classnames';
import PropTypes from 'prop-types';
import goodsStyle from './burger-constructor-goods.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { goodsPropTypes } from '../../../../../const';

function BurgerGoods(props) {
    return (
        <li className={goodsStyle.item}>
            <Counter count={1} size="default" />
            <img className='pl-4 pr-4' src={props.goods.image} alt="" />
            <p className={classNames(goodsStyle.price, 'text', 'text_type_main-medium', 'mb-1', 'mt-1')}>
                <span className='mr-2'>
                    {props.goods.price}
                </span>
                <CurrencyIcon type="primary" />
            </p>
            <p className={classNames(goodsStyle.name, 'text', 'text_type_main-default')}>
                {props.goods.name}                           
            </p>
        </li>
    )
}

BurgerGoods.propTypes = {
    goods: goodsPropTypes,
}

export default BurgerGoods;