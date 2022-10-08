import overlayStyle from './modal-overlay.module.css'

function ModalOverlay(props) {
    return (
        <div className={overlayStyle.overlay} onClick={props.closeModal}>
        </div>
    )
}

export default ModalOverlay