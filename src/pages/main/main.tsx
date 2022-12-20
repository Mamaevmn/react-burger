import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import classNames from 'classnames';
import styles from './main.module.css';

import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Modal from '../../components/modal/modal';
import OrderDetails from '../../components/modal-order-details/modal-order-details';
import { ORDER_TYPE } from '../../utils/const';
import { getUser } from '../../services/actions/user';
import { CLOSE_MODAL } from '../../services/constants';
import Loader from '../../components/loader/loader';
import {useDispatch, useSelector} from "../../services/hooks";

function Main() {
    const dispatch = useDispatch();
    
    const {visibleModal, modalType, loading} = useSelector(store => ({
        visibleModal: store.modals.visible,
        modalType: store.modals.type,
        loading: store.order.orderRequest
    }));

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch])

    const handleModalClose = () => {    
        dispatch({ type: CLOSE_MODAL })
    }

    return (
        <main className={classNames(styles.main, 'pt-10', 'pb-20')}>
            <div className={classNames(styles.container, 'container')}>
                <h1 className={classNames(styles.title, 'text', 'text_type_main-large')}>
                    Соберите бургер
                </h1>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider>
                {
                    visibleModal && (modalType === ORDER_TYPE) &&
                    <Modal onClose={handleModalClose}>
                        <OrderDetails />
                    </Modal>
                }
            </div>
        </main>
    )
}

export default Main