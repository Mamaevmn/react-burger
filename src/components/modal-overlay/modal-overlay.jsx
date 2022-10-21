import { useDispatch } from 'react-redux';
import { CLOSE_MODAL } from '../../services/actions/modals';

import overlayStyle from './modal-overlay.module.css'

function ModalOverlay() {
    const dispatch = useDispatch();
    
    const onCloseModal = () => dispatch({ type: CLOSE_MODAL })

    return (
        <div className={overlayStyle.overlay} onClick={onCloseModal}>
        </div>
    )
}

export default ModalOverlay