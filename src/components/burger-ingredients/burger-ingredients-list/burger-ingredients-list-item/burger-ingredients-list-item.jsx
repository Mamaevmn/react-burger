import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import Modal from '../../../modal/modal';
import ingredientStyle from './burger-ingredients-list-item.module.css'

function BurgerIngredientsListItem(props) {
    console.log(props);
    const [visibleModal, setVisibleModal] = useState(false)

    const onOpenModal = () => {
        setVisibleModal(true)
    }

    const onCloseModal = () => {
        setVisibleModal(false)
    }

    const onKeyPressCloseModal = (e) => {
        if (e.keyCode === 27) onCloseModal();
    }

    return (
        <>
            <div className={ingredientStyle.ingredient} onClick={onOpenModal}>
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
                    keypressCloseModal={onKeyPressCloseModal}
                    visibleModal={visibleModal}
                    item={props}
                    ingredient={true}
                />
            }
        </>
    )
}

export default BurgerIngredientsListItem