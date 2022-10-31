import { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import classNames from 'classnames';
import typesStyle from './burger-ingredients-block-goods.module.css';
import BurgerGoods from './burger-ingredients-goods/burger-ingredients-goods';

function BurgerIngredientsTypes() {
    const list = useRef()

    const { items, ingredientTypes, currentTab } = useSelector(store => ({
        items: store.ingredients.items,
        ingredientTypes: store.ingredients.ingredientTypes,
        currentTab: store.ingredients.currentTab
    }));

    const scrollBlock = useCallback(() => {
        if (currentTab) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const listToTop = Math.ceil(list.current.getBoundingClientRect().top + scrollTop);
            const activeBlock = list.current.querySelector(`[data-tab-content=${currentTab}`);
            
            if (activeBlock) {
                const activeBlockInnerPosition = activeBlock.offsetTop - listToTop;

                list.current.scrollTo({
                    top: activeBlockInnerPosition,
                    behavior: 'smooth'
                })
            }
        }
    }, [currentTab]) 

    useEffect(() => {
        scrollBlock()
    }, [currentTab, scrollBlock]);

    return (
        <ul className={classNames(typesStyle.wrapper, 'scroll-block', 'mt-10')} ref={list}>
            {ingredientTypes.map(type => 
                <li key={type.u_id} data-tab-content={type.type}>
                    <p className="text text_type_main-medium mb-6">
                        {type.name}
                    </p>
                    <ul className={classNames(typesStyle.list, 'pb-6', 'pl-4', 'pr-4')}>
                        { items.map(goods => type.type === goods.type && <BurgerGoods key={goods._id} goods={goods}/>) }
                    </ul>
                </li>
            )}
        </ul>
    )
}

export default BurgerIngredientsTypes