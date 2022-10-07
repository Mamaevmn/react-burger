import classNames from 'classnames';
import goodsStyle from './burger-constructor-goods.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { goodsPropTypes } from '../../../../utils/const';
import { useState } from 'react';
import Modal from '../../../modal/modal';

function BurgerGoods(props) {
    const [visibleModal, setVisibleModal] = useState(false)

    const onOpenModal = () => {
        setVisibleModal(true)
    }

    const onCloseModal = () => {
        setVisibleModal(false)
    }

    const onKeyPressCloseModal = (e) => {
        if (e.keyCode === 27) onCloseModal();
    }

    return (
        <>
            <li className={goodsStyle.item} onClick={onOpenModal}>
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
            {visibleModal && 
                <Modal
                    title='Детали ингредиента'
                    closeModal={onCloseModal}
                    keypressCloseModal={onKeyPressCloseModal}
                    visibleModal={visibleModal}
                    item={props.goods}
                    ingredient={true}
                />
            }
        </>
    )
}

BurgerGoods.propTypes = {
    goods: goodsPropTypes,
}

export default BurgerGoods;