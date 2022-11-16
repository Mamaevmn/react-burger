import { useEffect } from "react";
import PortalReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';

import classNames from 'classnames';
import modalStyle from './modal.module.css'

import ModalOverlay from '../modal-overlay/modal-overlay';
import { ESC_KEYCODE } from "../../utils/const";
import { CLOSE_MODAL } from "../../services/actions/modals";

const modalRoot = document.getElementById("react-modals");

function Modal({ children, onClose }) {
    const dispatch = useDispatch();

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
    }, [dispatch])

    return PortalReactDOM.createPortal(
        <>
            <ModalOverlay onClose={onClose} />
            <section className={classNames(modalStyle.modal, 'pl-10', 'pr-10', 'pb-15')}>
                <button className={classNames(modalStyle.modal_close_btn)} onClick={onClose}></button>
                {children}
            </section>
        </>,
        modalRoot
    )
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired
}

export default Modal