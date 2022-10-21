import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorElementStyle from './burger-constructor-list-item.module.css'
import touchSvg from './../../../../images/icons/touch-btn.svg'

import { DELETE_INGREDIENTS } from '../../../../services/actions/constructor';
import { OPEN_MODAL } from '../../../../services/actions/modals';
import { DECREASE_ITEM_COUNT } from '../../../../services/actions/ingredients';
import { BUN_TYPE, INGREDIENTS_DETAIL_MODAL_TITLE, INGREDIENTS_TYPE } from '../../../../utils/const';

function BurgerConstructorListItem(props) {
    const dispatch = useDispatch();

    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: 'component',
        collect(monitor) {
          return {
            handlerId: monitor.getHandlerId()
          }
        },
        hover(item, monitor) {
            if (!ref.current) {
              return;
            }
            const dragIndex = item.idx;
            const hoverIndex = props.idx;

            if (dragIndex === hoverIndex) {
              return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
              return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
              return;
            }
            props.moveConstructorIngredient(dragIndex, hoverIndex);
            item.idx = hoverIndex;
        }
    })

    const [{ opacity }, ingredientRef] = useDrag({
        type: 'component',
        item: { ...props },
        collect: monitor => ({
          opacity: monitor.isDragging() ? 'opacity' : ''
        })
    });

    ingredientRef(drop(ref))

    const preventDefault = (e) => e.preventDefault();

    const onOpenModal = () => dispatch({ type: OPEN_MODAL, payload: {
        item: props,
        type: INGREDIENTS_TYPE,
        title: INGREDIENTS_DETAIL_MODAL_TITLE
    }})
    
    const deleteConstructorIngredient = (e) => {
        e.stopPropagation();
        dispatch({ type: DELETE_INGREDIENTS, payload: props.u_id });
        dispatch({ type: DECREASE_ITEM_COUNT, payload: props._id });
    }

    return (
        props.type !== BUN_TYPE ? 
        <li className={`${constructorElementStyle.constructor_element} ${opacity && constructorElementStyle.opacity}`} 
            ref={ref}
            onDrop={preventDefault}
            data-handler-id={handlerId}
        >
            <button className={constructorElementStyle.touch_btn}>
                <img src={touchSvg} alt="touch-icon" />
            </button>
            <div className={constructorElementStyle.ingredient} onClick={onOpenModal} >
                <ConstructorElement 
                    type={props.type}
                    isLocked={props.isLocked}
                    text={props.text ? props.text : props.name}
                    price={props.price}
                    thumbnail={props.image_mobile}
                    handleClose={(e) => deleteConstructorIngredient(e)}
                />
            </div>
        </li> :
        <div className={constructorElementStyle.ingredient} onClick={onOpenModal} >
            <ConstructorElement 
                type={props.addClass}
                isLocked={props.isLocked}
                text={props.text ? props.text : props.name}
                price={props.price}
                thumbnail={props.image_mobile}
                handleClose={(e) => deleteConstructorIngredient(e)}
            />
        </div>
    )
}

export default BurgerConstructorListItem