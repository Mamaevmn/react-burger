import classNames from 'classnames';
import modalContentStyle from './modal-order-details.module.css'
import accessIcon from './../../images/icons/access-icon.svg'
import PropTypes from 'prop-types';

function OrderDetails(props) {
    return (
        <div className={modalContentStyle.modal_content}>
            {props.loading && 'Загрузка...'}
            {props.hasError && 'Произошла ошибка'}
            {!props.loading &&
            !props.hasError &&
                <>
                    <p className={classNames(modalContentStyle.modal_content_title, 'text', 'text_type_digits-large', 'pt-9')}>
                        {props.numberOrder}
                    </p>
                    <p className='text text_type_main-medium pt-8 pb-10'>идентификатор заказа</p>
                    <img className='pt-5 pb-5' src={accessIcon} alt='access'/>
                    <p className='text text_type_main-medium pt-10'>Ваш заказ начали готовить</p>
                    <p className='text text_type_main-medium text_color_inactive pt-2 pb-15'>Дождитесь готовности на орбитальной станции</p>
                </>
            }
        </div>
    )
} 

OrderDetails.propTypes = {
    loading: PropTypes.bool,
    hasError: PropTypes.bool,
    numberOrder: PropTypes.number.isRequired,
}

export default OrderDetails