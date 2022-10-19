import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

import classNames from 'classnames';
import constructorStyle from './burger-constructor.module.css'
import BurgerConstructorTotal from './burger-constructor-total/burger-constructor-total';
import BurgerConstructorList from './burger-constructor-list/burger-constructor-list';
import { ADD_BUN, ADD_INGREDIENT } from '../../services/actions/constructor';
import { INCREASE_ITEM_COUNT } from '../../services/actions/ingredients';
import { v4 as uuidv4 } from 'uuid';

function BurgerConstructor() {
    const dispatch = useDispatch();

    const [{ isHover }, dropTarget] = useDrop({
        accept: 'items',
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(item) {
            addIngredient(item)
        }
    });

    const borderColor = isHover ? 'bc-lightgreen' : 'bc-transparent';

    const addIngredient = (item) => {
        if (item.type === 'bun') {
            dispatch({ type: ADD_BUN, payload: item })
            dispatch({ type: INCREASE_ITEM_COUNT, payload: item._id })
        };
        if (item.type !== 'bun') {
            dispatch({ type: ADD_INGREDIENT, payload: {
                ...item,
                u_id: uuidv4(),
            } })
            dispatch({ type: INCREASE_ITEM_COUNT, payload: item._id })
        };
    }
    
    return (
        <section className={classNames(constructorStyle.section, borderColor, 'pt-25', 'pl-4', 'pr-4')} ref={dropTarget}>
            <BurgerConstructorList />
            <BurgerConstructorTotal />
        </section>
    )
}

export default BurgerConstructor