import { useEffect } from "react";
import PortalReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import classNames from 'classnames';
import PropTypes from 'prop-types';
import modalStyle from './modal.module.css'

import ModalOverlay from '../modal-overlay/modal-overlay';
import { ESC_KEYCODE } from "../../utils/const";
import { CLOSE_MODAL } from "../../services/actions/modals";

const modalRoot = document.getElementById("react-modals");

function Modal({ children }) {
    const dispatch = useDispatch();
    const { title, number, visibleModal} = useSelector(store => ({
        title: store.modals.title,
        number: store.modals.orderNumber,
        visibleModal: store.modals.visible
    }));

    useEffect(() => {
        const onKeyPressCloseModal = (e) => {
            if (e.keyCode === ESC_KEYCODE) dispatch({ type: CLOSE_MODAL });
        }

        document.body.style.overflow = 'hidden'
        window.addEventListener('keyup', onKeyPressCloseModal);

        return (() => {
            document.body.style.overflow = 'unset'
            window.removeEventListener('keyup', onKeyPressCloseModal)
        })
    }, [visibleModal, dispatch])

    const onCloseModal = () => dispatch({ type: CLOSE_MODAL })

    return PortalReactDOM.createPortal(
        <>
            <ModalOverlay />
            <section className={classNames(modalStyle.modal, 'pl-10', 'pr-10', 'pb-15')}>
                <div className={number ? modalStyle.modal_header_order : modalStyle.modal_header}>
                    {title && <p className="text text_type_main-large">{title}</p>}
                    <button className={classNames(modalStyle.modal_close_btn)} onClick={onCloseModal}></button>
                </div>
                {children}
            </section>
        </>,
        modalRoot
    )
}

Modal.propTypes = {
    children: PropTypes.element,
}

export default Modal