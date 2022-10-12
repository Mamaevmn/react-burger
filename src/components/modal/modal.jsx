import PortalReactDOM from "react-dom";
import { useEffect } from "react";
import classNames from 'classnames';
import modalStyle from './modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay';
import { ESC_KEYCODE } from "../../utils/const";
import PropTypes from 'prop-types';
const modalRoot = document.getElementById("react-modals");

function Modal(props) {
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        window.addEventListener('keyup', onKeyPressCloseModal);

        return (() => {
            document.body.style.overflow = 'unset'
            window.removeEventListener('keyup', onKeyPressCloseModal)
        })
    }, [props.visibleModal])

    const onKeyPressCloseModal = (e) => {
        if (e.keyCode === ESC_KEYCODE) props.closeModal();
    }

    return PortalReactDOM.createPortal(
        <>
            <ModalOverlay closeModal={props.closeModal}/>
            <section className={classNames(modalStyle.modal, 'pl-10', 'pr-10', 'pb-15')}>
                <div className={props.order ? modalStyle.modal_header_order : modalStyle.modal_header}>
                    {props.title && <p className="text text_type_main-large">{props.title}</p>}
                    <button className={classNames(modalStyle.modal_close_btn)} onClick={props.closeModal}></button>
                </div>
                {props.children}
            </section>
        </>,
        modalRoot
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    order: PropTypes.bool,
    visibleModal: PropTypes.bool.isRequired,
}

export default Modal