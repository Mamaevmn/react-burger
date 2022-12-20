import { useEffect, FC, ReactNode } from "react";
import PortalReactDOM from "react-dom";

import classNames from 'classnames';
import modalStyle from './modal.module.css'

import ModalOverlay from '../modal-overlay/modal-overlay';
import { calcWidthScrollbar, ESC_KEYCODE } from "../../utils/const";
import {useDispatch} from "../../services/hooks";

const modalRoot = document.getElementById("react-modals");

type TModal = {
    onClose: () => void;
    children: ReactNode;
}

const Modal: FC<TModal> = ({ children, onClose }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const onKeyPressCloseModal = (e: KeyboardEvent) => {
            if (e.keyCode === ESC_KEYCODE) onClose()
        }

        document.body.style.overflow = 'hidden'
        document.documentElement.style.setProperty('--padding-right', `${calcWidthScrollbar()}px`);
        window.addEventListener('keyup', onKeyPressCloseModal);

        return (() => {
            document.body.style.overflow = 'unset'
            document.documentElement.style.setProperty('--padding-right', '0');
        window.removeEventListener('keyup', onKeyPressCloseModal)
        })
    }, [dispatch, onClose])

    return PortalReactDOM.createPortal(
        <>
            <ModalOverlay onClose={onClose} />
            <section className={classNames(modalStyle.modal, 'pl-10', 'pr-10', 'pb-15')} data-cy-section='modal'>
                <button className={classNames(modalStyle.modal_close_btn)} onClick={onClose}></button>
                {children}
            </section>
        </>,
        modalRoot
    )
}

export default Modal