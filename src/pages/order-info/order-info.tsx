import styles from './order-info.module.css'
import classNames from "classnames";
import ModalOrderInfo from "../../components/modal-order-info/modal-order-info";

function OrderInfo() {
    return (
        <section className={classNames(styles.wrapper, 'container')}>
            <ModalOrderInfo/>
        </section>
    )
}

export default OrderInfo;