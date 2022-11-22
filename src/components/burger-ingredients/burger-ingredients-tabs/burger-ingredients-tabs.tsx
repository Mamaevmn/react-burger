import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import typesStyle from './burger-ingredients-tabs.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { SET_CURRENT_TAB } from '../../../services/actions/ingredients';
import { TIngredientsType, TIngredientsTypesName } from '../../../utils/types';

type TStore = {
  ingredients: {
    ingredientTypes: Array<TIngredientsType>
    currentTab: string;
  },
}

function Tabs() {
  const dispatch = useDispatch();

  const ingredientTypes: any = useSelector<TStore>(store => store.ingredients.ingredientTypes)
  const currentTab: any = useSelector<TStore>(store => store.ingredients.currentTab)

  useEffect(() => {
      if (ingredientTypes.length) dispatch({ type: SET_CURRENT_TAB, payload: ingredientTypes[0].type as TIngredientsTypesName})
    }, 
    [ dispatch, ingredientTypes ] 
  );

  const setCurrentTab = (e: MouseEvent) => {
    dispatch({ type: SET_CURRENT_TAB, payload: e})
  };

  return (
    <ul className={typesStyle.wrapper}>
      {ingredientTypes.map((type: TIngredientsType) => 
      <li key={type.u_id} data-tab={type.type}>
        <Tab value={type.type} active={currentTab === type.type} onClick={(e) => setCurrentTab}>
          {type.name}
        </Tab>
      </li>
      )}
    </ul>
  )
}

export default Tabs