import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import classNames from 'classnames';
import mainStyle from './main.module.css';

import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Modal from '../../components/modal/modal';
import OrderDetails from '../../components/modal-order-details/modal-order-details';
import { ORDER_TYPE } from '../../utils/const';
import { getUser } from '../../services/actions/user';
import { CLOSE_MODAL } from '../../services/actions/modals';
import Loader from '../../components/loader/loader';

type TStore = {
    modals: {
        type: string;
        visible: boolean;
    },
    order: {orderRequest: boolean}
}

function Main() {
    const dispatch = useDispatch();
    
    const visibleModal: any = useSelector<TStore>(store => store.modals.visible);
    const modalType: any = useSelector<TStore>(store => store.modals.type);
    const loading: any = useSelector<TStore>(store => store.order.orderRequest);

    useEffect(() => {
        dispatch<any>(getUser());
    }, [dispatch])

    const handleModalClose = () => {    
        dispatch<any>({ type: CLOSE_MODAL })
    }

    return (
        <main className='pt-10 pb-20'>
            <div className={classNames(mainStyle.container, 'container')}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider>
                {loading ? 
                    <Loader /> :
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