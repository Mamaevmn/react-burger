import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import classNames from 'classnames';
import mainStyle from './app-main.module.css';
import BurgerIngredients from './../burger-ingredients/burger-ingredients';
import BurgerConstructor from './../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../modal-ingredient-details/modal-ingredient-details';
import OrderDetails from '../modal-order-details/modal-order-details';
import { INGREDIENTS_TYPE } from '../../utils/const';

function AppMain() {
    const { visibleModal, modalType } = useSelector(store => ({
        visibleModal: store.modals.visible,
        modalType: store.modals.type
    }));

    return (
        <main className={classNames(mainStyle.main, 'pt-10')}>
            <div className={classNames(mainStyle.main_container, 'container')}>
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

export default AppMain