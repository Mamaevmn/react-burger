import { FC } from 'react';

import overlayStyle from './modal-overlay.module.css'

type TModalOverlay = {
    onClose: () => void
}

const ModalOverlay: FC<TModalOverlay> = ({ onClose }) => {
    return (
        <div className={overlayStyle.overlay} onClick={onClose}>
        </div>
    )
}

export default ModalOverlay