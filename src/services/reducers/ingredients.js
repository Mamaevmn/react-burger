import { nanoid } from 'nanoid';
import { 
  BUN_TYPE, 
  BUN_TYPE_RU_TRANSLATE, 
  MAIN_TYPE, 
  MAIN_TYPE_RU_TRANSLATE, 
  SAUCE_TYPE, 
  SAUCE_TYPE_RU_TRANSLATE 
} from '../../utils/const';

import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_TYPES,
    SET_CURRENT_TAB,
    INCREASE_ITEM_COUNT,
    DECREASE_ITEM_COUNT,
  } from '../actions/ingredients';

const ingredientsInitialState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false,

    ingredientTypes: [],

    currentTab: '',
};

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        itemsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { 
        ...state, 
        items: action.items.map(item => ({...item, counter: 0})), 
        itemsFailed: false, 
        itemsRequest: false 
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }
    case GET_INGREDIENTS_TYPES: {
      const typesObjArray = state.items.reduce((types, item) => {
            if (!types.includes(item.type)) types.push(item.type)
            return types
          }, []).map(type => ({
              type: type,
              name: type === BUN_TYPE ? BUN_TYPE_RU_TRANSLATE : 
                    type === MAIN_TYPE ? MAIN_TYPE_RU_TRANSLATE : 
                    type === SAUCE_TYPE ? SAUCE_TYPE_RU_TRANSLATE : '',
              u_id: nanoid(),
            }))

      return {
        ...state,
        ingredientTypes: typesObjArray,
      }
    }
    case SET_CURRENT_TAB: {
      return { ...state, currentTab: action.payload };
    }
    case INCREASE_ITEM_COUNT: {
      const isBun = state.items.find(item => item._id === action.payload)?.type === BUN_TYPE;
      
      if (isBun) {
        return {
          ...state,
          items: [...state.items].map(item => {
              if (item.type === BUN_TYPE) {
                if (item._id === action.payload && item.counter === 0) return { ...item, counter: ++item.counter + 1 } 
                if (item._id !== action.payload && item.counter > 0) return { ...item, counter: 0 } 
                else return item
              } else return item
          })
        }
      } else return {
        ...state,
        items: [...state.items].map(item => item._id === action.payload ? { ...item, counter: ++item.counter } : item)
      }
    }
    case DECREASE_ITEM_COUNT: {
      const isBun = state.items.find(item => item._id === action.payload).type === BUN_TYPE;
      
      if (!isBun) {
        return {
          ...state,
          items: [...state.items].map(item => item._id === action.payload ? { ...item, counter: --item.counter } : item)
        }
      } else break
    }
    default: {
      return state;
    }
  }
};
  