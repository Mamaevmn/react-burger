import { useRef, FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDrag, useDrop } from 'react-dnd';
import { Identifier } from 'dnd-core';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorElementStyle from './burger-constructor-list-item.module.css'
import touchSvg from './../../../../images/icons/touch-btn.svg'

import { DELETE_INGREDIENTS, OPEN_MODAL, DECREASE_ITEM_COUNT } from '../../../../services/constants';
import { BUN_TYPE, INGREDIENTS_TYPE } from '../../../../utils/const';
import classNames from 'classnames';
import {useDispatch} from "../../../../services/hooks";
import { ILocation, TFullIngredient } from '../../../../services/types/data';

type TBurgerConstructorListItem = TFullIngredient & {
  idx?: number;
  addClass?: 'top' | 'bottom';
  isLocked?: boolean;
  text?: string;
  moveConstructorIngredient?: (dragIndex: number, hoverIndex: number) => void;
}

type TDndItem = TFullIngredient & {
  idx: number;
}

const BurgerConstructorListItem: FC<TBurgerConstructorListItem> = (props) => {
  const dispatch = useDispatch();
  const location = useLocation<ILocation>()
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop<TDndItem, void, { handlerId: Identifier | null }>({
    accept: 'component',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item: TDndItem, monitor) {
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

  const onOpenModal = () => dispatch({ type: OPEN_MODAL, payload: INGREDIENTS_TYPE })

  const deleteConstructorIngredient = (e?: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: DELETE_INGREDIENTS, payload: props.u_id });
    dispatch({ type: DECREASE_ITEM_COUNT, payload: props._id });
  }

  return (
    props.type !== BUN_TYPE ?
      <li className={`${constructorElementStyle.constructor_element} ${opacity && constructorElementStyle.opacity}`}
        ref={ref}
        onDrop={(e) => e.preventDefault()}
        data-handler-id={handlerId}
      >
        <button className={constructorElementStyle.touch_btn}>
          <img src={touchSvg} alt="touch-icon" />
        </button>
        <Link
          className={classNames(constructorElementStyle.ingredient, 'text', 'text_color_primary')}
          onClick={onOpenModal}
          to={{
            pathname: `/ingredients/${props._id}`,
            state: {
              background: location
            }
          }}>
          <ConstructorElement
            isLocked={props.isLocked}
            text={props.text ? props.text : props.name}
            price={props.price}
            thumbnail={props.image_mobile}
            handleClose={deleteConstructorIngredient}
          />
        </Link>
      </li> :
      <Link
        className={classNames(constructorElementStyle.ingredient, 'text', 'text_color_primary')}
        onClick={onOpenModal}
        to={{
          pathname: `/ingredients/${props._id}`,
          state: {
            background: location
          }
        }}>
        <ConstructorElement
          type={props.addClass}
          isLocked={props.isLocked}
          text={props.text ? props.text : props.name}
          price={props.price}
          thumbnail={props.image_mobile}
        />
      </Link>
  )
}

export default BurgerConstructorListItem