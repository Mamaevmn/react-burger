import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import typesStyle from './burger-ingredients-tabs.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { SET_CURRENT_TAB } from '../../../services/constants';

function Tabs() {
  const dispatch = useDispatch();

  const { ingredientTypes, currentTab} = useSelector(store => ({
    ingredientTypes: store.ingredients.ingredientTypes,
    currentTab: store.ingredients.currentTab
  }));

  useEffect(() => {
      if (ingredientTypes.length) dispatch({ type: SET_CURRENT_TAB, payload: ingredientTypes[0].type})
    }, 
    [ dispatch, ingredientTypes ] 
  );

  const setCurrentTab = (e) => {
    dispatch({ type: SET_CURRENT_TAB, payload: e})
  };

  return (
    <ul className={typesStyle.wrapper}>
      {ingredientTypes.map(type => 
      <li key={type.u_id} data-tab={type.type}>
        <Tab value={type.type} active={currentTab === type.type} onClick={setCurrentTab}>
          {type.name}
        </Tab>
      </li>
      )}
    </ul>
  )
}

export default Tabs