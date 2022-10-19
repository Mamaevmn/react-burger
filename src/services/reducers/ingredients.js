import { nanoid } from 'nanoid';
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
      return { ...state, itemsFailed: false, items: action.items, itemsRequest: false };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }
    case GET_INGREDIENTS_TYPES: {
      let types = [];
      let typesObjArray = [];

      state.items.forEach(item => {
        if (!types.includes(item.type)) {types.push(item.type)}
      });

      for (let type of types) {
        typesObjArray.push({
          type: type,
          name: type === 'bun' ? 'Булка' : type === 'main' ? 'Начинки' : type === 'sauce' ? 'Соусы' : '',
          u_id: nanoid(),
        })
      }

      return {
        ...state,
        ingredientTypes: typesObjArray,
      }
    }
    case SET_CURRENT_TAB: {
      return { ...state, currentTab: action.payload };
    }
    case INCREASE_ITEM_COUNT: {
      const isBun = state.items.find(item => item._id === action.payload).type === 'bun';
      
      if (isBun) {
        return {
          ...state,
          items: [...state.items].map(item => {
              if (item.type === 'bun') {
                if (item._id === action.payload && item.__v === 0) return { ...item, __v: ++item.__v + 1 } 
                if (item._id !== action.payload && item.__v > 0) return { ...item, __v: 0 } 
                else return item
              } else return item
          })
        }
      } else return {
        ...state,
        items: [...state.items].map(item => item._id === action.payload ? { ...item, __v: ++item.__v } : item)
      }
    }
    case DECREASE_ITEM_COUNT: {
      const isBun = state.items.find(item => item._id === action.payload).type === 'bun';
      
      if (!isBun) {
        return {
          ...state,
          items: [...state.items].map(item => item._id === action.payload ? { ...item, __v: --item.__v } : item)
        }
      } else break
    }
    default: {
      return state;
    }
  }
};
  