import { useEffect } from 'react';

import typesStyle from './burger-ingredients-tabs.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { SET_CURRENT_TAB } from '../../../services/constants';
import {useDispatch, useSelector} from "../../../services/hooks";
import { TIngredientsType, TIngredientsTypesName } from '../../../services/types/data';

function Tabs() {
  const dispatch = useDispatch();
  const {ingredientTypes, currentTab} = useSelector(store => ({
    ingredientTypes: store.ingredients.ingredientTypes,
    currentTab: store.ingredients.currentTab
  }))

  useEffect(() => {
      if (ingredientTypes.length) dispatch({ type: SET_CURRENT_TAB, payload: ingredientTypes[0].type as TIngredientsTypesName})
    }, 
    [ dispatch, ingredientTypes ] 
  );

  const setCurrentTab = (currType: string) => {
    dispatch({ type: SET_CURRENT_TAB, payload: currType})
  };

  return (
    <ul className={typesStyle.wrapper}>
      {ingredientTypes.map((type: TIngredientsType) => 
      <li key={type.u_id} data-tab={type.type}>
        <Tab value={type.type} active={currentTab === type.type} onClick={() => setCurrentTab(type.type)}>
          {type.name}
        </Tab>
      </li>
      )}
    </ul>
  )
}

export default Tabs