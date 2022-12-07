import {useCallback} from 'react';

import classNames from 'classnames';
import constructorStyle from './burger-constructor-list.module.css'

import BurgerConstructorListItem from './burger-constructor-list-item/burger-constructor-list-item';
import {UPDATE_CONSTRUCTOR_LIST} from '../../../services/constants';
import {useDispatch, useSelector} from "../../../services/hooks";
import { TFullIngredient } from '../../../services/types/data';

function BurgerConstructorList() {
    const dispatch = useDispatch();

    const {constructorData, bunData} = useSelector(store => ({
        constructorData: store.burgerConstructor.items,
        bunData: store.burgerConstructor.bun
    }));

    const moveConstructorIngredient = useCallback((dragIndex: number, hoverIndex: number) => {
        const dragConstructorIngredient = constructorData[dragIndex];
        const newConstructorIngredients = [...constructorData];

        newConstructorIngredients.splice(dragIndex, 1)
        newConstructorIngredients.splice(hoverIndex, 0, dragConstructorIngredient)

        dispatch({ type: UPDATE_CONSTRUCTOR_LIST, payload: newConstructorIngredients })
    }, [constructorData, dispatch]);

    return (
        <>
            <div className={classNames(constructorStyle.wrapper, 'pl-8')}>
                {!constructorData.length && !bunData ?
                    <p className='text text_type_main-default ml-2'>
                        Тут пока пусто... Добавьте сюда ингредиенты
                    </p> :
                    <>
                        {bunData &&
                            <BurgerConstructorListItem
                                isLocked={true}
                                addClass={'top'}
                                text={`${bunData.name} (верх)`}
                                {...bunData}
                            />
                        }
                        {constructorData.length ?
                            <ul className={classNames(constructorStyle.list, 'scroll-block')}>
                                {constructorData.map((goods: TFullIngredient, index: number) =>
                                    <BurgerConstructorListItem key={goods.u_id} idx={index} {...goods} moveConstructorIngredient={moveConstructorIngredient}/>)}
                            </ul> : null
                        }
                        {bunData &&
                            <BurgerConstructorListItem
                                isLocked={true}
                                addClass={'bottom'}
                                text={`${bunData.name} (низ)`}
                                {...bunData}
                            />
                        }
                    </>
                }
            </div>
        </>
    )
}

export default BurgerConstructorList