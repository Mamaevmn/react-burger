import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import IngredientDetails from '../../../modal-ingredient-details/modal-ingredient-details';
import Modal from '../../../modal/modal';
import constructortyle from './burger-constructor-list-item.module.css'

function BurgerConstructorListItem(props) {
    const [ visibleModal, setVisibleModal ] = useState(false)

    const onOpenModal = () => {
        setVisibleModal(true)
    }

    const onCloseModal = () => {
        setVisibleModal(false)
    }

    return (
        <>
            <div className={constructortyle.ingredient} onClick={onOpenModal}>
                <ConstructorElement 
                    type={props.type}
                    isLocked={props.isLocked}
                    text={props.text ? props.text : props.name}
                    price={props.price}
                    thumbnail={props.image_mobile}
                />
            </div>
            {visibleModal && 
                <Modal
                    title='Детали ингредиента'
                    closeModal={onCloseModal}
                    visibleModal={visibleModal}
                >
                    <IngredientDetails item={props}/>
                </Modal>
            }
        </>
    )
}

export default BurgerConstructorListItem