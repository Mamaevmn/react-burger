import PortalReactDOM from "react-dom";
import { useEffect } from "react";
import classNames from 'classnames';
import modalStyle from './modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay';
import IngredientDetails from "../modal-ingredient-details/modal-ingredient-details";
import OrderDetails from "../modal-order-details/modal-order-details";
import { goodsPropTypes } from "../../utils/const";
import PropTypes from 'prop-types';
const modalRoot = document.getElementById("react-modals");

function Modal(props) {
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        window.addEventListener('keyup', props.keypressCloseModal);

        return (() => {
            document.body.style.overflow = 'unset'
            window.removeEventListener('keyup', props.keypressCloseModal)
        })
    }, [props.visibleModal])

    return PortalReactDOM.createPortal(
        <>
            <ModalOverlay closeModal={props.closeModal}/>
            <section className={classNames(modalStyle.modal, 'pl-10', 'pr-10', 'pb-15')}>
                <div className={props.order ? modalStyle.modal_header_order : modalStyle.modal_header}>
                    {props.title && <p className="text text_type_main-large">{props.title}</p>}
                    <button className={classNames(modalStyle.modal_close_btn)} onClick={props.closeModal}></button>
                </div>
                {props.ingredient && <IngredientDetails item={props.item}/>}
                {props.order && <OrderDetails numberOrder={props.numberOrder} loading={props.loading} hasError={props.hasError}/>}
            </section>
        </>,
        modalRoot
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    item: goodsPropTypes,
    ingredient: PropTypes.bool,
    order: PropTypes.bool,
    numberOrder: PropTypes.number,
    visibleModal: PropTypes.bool.isRequired,
}

export default Modal