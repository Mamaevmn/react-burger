import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import typesStyle from './burger-ingredients-block-goods.module.css';
import BurgerGoods from './burger-ingredients-goods/burger-ingredients-goods';
import { SET_CURRENT_TAB } from '../../../services/actions/ingredients';

function BurgerIngredientsTypes() {
    const list = useRef()

    const { ingredientTypes, currentTab } = useSelector(store => ({
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
                <BurgerIngredientsTypesTab key={type.u_id} {...type} />
            )}
        </ul>
    )
}

export default BurgerIngredientsTypes

function BurgerIngredientsTypesTab({ type, name}) {
    const dispatch = useDispatch()
    const items = useSelector(store => store.ingredients.items);

    const { ref, inView } = useInView({
        threshold: 0.25,
    });

    useEffect(() => {
        if (inView) dispatch({ type: SET_CURRENT_TAB, payload: type })
    }, [dispatch, inView, type])

    return (
        <li  data-tab-content={type} ref={ref}>
            <p className="text text_type_main-medium mb-6">
                {name}
            </p>
            <ul className={classNames(typesStyle.list, 'pb-6', 'pl-4', 'pr-4')}>
                { items.map(goods => type === goods.type && <BurgerGoods key={goods._id} goods={goods}/>) }
            </ul>
        </li>
    )
} 

BurgerIngredientsTypesTab.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string
}