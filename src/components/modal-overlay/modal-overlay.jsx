import PropTypes from 'prop-types';

import overlayStyle from './modal-overlay.module.css'

function ModalOverlay({ onClose }) {
    return (
        <div className={overlayStyle.overlay} onClick={onClose}>
        </div>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay