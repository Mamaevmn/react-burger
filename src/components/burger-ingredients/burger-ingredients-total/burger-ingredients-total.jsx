import classNames from 'classnames';
import PropTypes from 'prop-types';
import totalStyle from './burger-ingredients-total.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { goodsPropTypes } from '../../../utils/const';
import { useState } from 'react';
import Modal from '../../modal/modal';

function BurgerIngredientsTotal(props) {
    const [visibleModal, setVisibleModal] = useState(false);

    let price_arr = [],
        total_price;
    for (let goods of props.data) price_arr.push(goods.price);
    total_price = price_arr.reduce((previousValue, currentValue) => previousValue + currentValue);

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
            <div className={classNames(totalStyle.total, 'pt-10')}>
                <p className={classNames(totalStyle.text, 'text', 'text_type_digits-medium', 'pr-10')}>
                    <span className='mr-2'>
                        {total_price}
                    </span>
                    <CurrencyIcon type="primary" />
                </p>
                <Button type="primary" size="large" htmlType="button" onClick={() => onOpenModal()}>
                    Оформить заказ
                </Button>
            </div>
            {visibleModal && 
                <Modal
                    closeModal={onCloseModal}
                    keypressCloseModal={onKeyPressCloseModal}
                    visibleModal={visibleModal}
                    item={props.goods}
                    order={true}
                />
            }
        </>
    )
}

BurgerIngredientsTotal.propTypes = {
    data: PropTypes.arrayOf(goodsPropTypes),
}

export default BurgerIngredientsTotal