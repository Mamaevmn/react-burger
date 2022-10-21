import { getData } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const GET_INGREDIENTS_TYPES = 'GET_INGREDIENTS_TYPES';

export const SET_CURRENT_TAB = 'SET_CURRENT_TAB';

export const INCREASE_ITEM_COUNT = 'INCREASE_ITEM_COUNT';
export const DECREASE_ITEM_COUNT = 'DECREASE_ITEM_COUNT';

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getData().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          items: res.data,
        });
        dispatch({ type: GET_INGREDIENTS_TYPES });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      }
    }).catch(e => {
      dispatch({
        type: GET_INGREDIENTS_FAILED
      });
    });
  };
}