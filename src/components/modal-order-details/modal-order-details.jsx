import { useSelector } from 'react-redux';

import classNames from 'classnames';
import modalContentStyle from './modal-order-details.module.css'
import accessIcon from './../../images/icons/access-icon.svg'

function OrderDetails() {
    const number = useSelector(store => store.order.orderNumber);

    return (
        <div className={modalContentStyle.modal_content}>
            <p className={classNames(modalContentStyle.modal_content_title, 'text', 'text_type_digits-large')}>
                {number}
            </p>
            <p className='text text_type_main-medium pt-8 pb-10'>идентификатор заказа</p>
            <img className='pt-5 pb-5' src={accessIcon} alt='access'/>
            <p className='text text_type_main-medium pt-10'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-medium text_color_inactive pt-2 pb-15'>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
} 

export default OrderDetails