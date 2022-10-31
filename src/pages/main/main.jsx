import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import classNames from 'classnames';
import mainStyle from './main.module.css';

import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Modal from '../../components/modal/modal';
import IngredientDetails from '../../components/modal-ingredient-details/modal-ingredient-details';
import OrderDetails from '../../components/modal-order-details/modal-order-details';
import { INGREDIENTS_TYPE } from '../../utils/const';
import { CLEAR_LOGIN_FIELDS } from '../../services/actions/login';
import { getUser } from '../../services/actions/user';

function Main() {
    const dispatch = useDispatch();

    const { visibleModal, modalType } = useSelector(store => ({
        visibleModal: store.modals.visible,
        modalType: store.modals.type,
    }));

    useEffect(()=> {
        dispatch({ type: CLEAR_LOGIN_FIELDS });
        dispatch(getUser());
    }, [dispatch])

    return (
        <main className='pt-10 pb-20'>
            <div className={classNames(mainStyle.container, 'container')}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider>
                {visibleModal && 
                    <Modal>
                        {modalType === INGREDIENTS_TYPE ? <IngredientDetails /> :<OrderDetails /> }
                    </Modal>
                }
            </div>
        </main>
    )
}

export default Main