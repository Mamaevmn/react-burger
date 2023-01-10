import classNames from 'classnames';
import modalContentStyle from './modal-order-details.module.css'
import accessIcon from './../../images/icons/access-icon.svg'
import {useSelector} from "../../services/hooks";

function OrderDetails() {
    const number = useSelector(store => store.order.orderNumber);
    const loading = useSelector(store => store.order.orderRequest);

    return (
        <div className={modalContentStyle.modal_content}>
            {loading ?
                <>
                    <p className='text text_type_main-medium'>Ваш заказ начали готовить</p>
                    <p className='text text_type_main-medium text_color_inactive pt-10 pb-15'>Дождитесь готовности на орбитальной станции</p>
                </> :
                <>
                    <p className={classNames(modalContentStyle.modal_content_title, 'text', 'text_type_digits-large')}>
                        { number as number}
                    </p>
                    <p className='text text_type_main-medium pt-8 pb-10'>идентификатор заказа</p>
                    <img className='pt-5 pb-5' src={accessIcon} alt='access'/>
                    <p className='text text_type_main-medium pt-10'>Ваш заказ готов!</p>
                </>
            }
        </div>
    )
} 

export default OrderDetails