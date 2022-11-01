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
    dispatch(ingredientsRequestAC());
    getData().then(res => {
        dispatch(ingredientsSuccessRequestAC(res.data));
        dispatch(getIngredientsTypesAC());
    }).catch(() => dispatch(ingredientsFailedRequestAC()));
  };
}

function ingredientsRequestAC() {
  return { type: GET_INGREDIENTS_REQUEST }
}

function ingredientsSuccessRequestAC(data) {
  return {
      type: GET_INGREDIENTS_SUCCESS,
      payload: data,
  }
}

function ingredientsFailedRequestAC() {
  return { type: GET_INGREDIENTS_FAILED }
}

function getIngredientsTypesAC() {
  return { type: GET_INGREDIENTS_TYPES }
}