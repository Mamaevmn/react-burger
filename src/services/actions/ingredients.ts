import { getData } from "../../utils/api";
import {
  CLEAR_ITEMS_COUNT,
  DECREASE_ITEM_COUNT,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_TYPES,
  INCREASE_ITEM_COUNT,
  SET_CURRENT_TAB
} from "../constants";
import { AppDispatch, AppThunk } from "../types";
import { TIngredientsTypesName } from "../types/data";

export interface IIngredientsRequestAC {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IIngredientsSuccessRequestAC {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: any
}

export interface IIngredientsFailedRequestAC {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetIngredientsTypesAC {
  readonly type: typeof GET_INGREDIENTS_TYPES;
}

export interface ISetCurrentTabAC {
  readonly type: typeof SET_CURRENT_TAB;
  readonly payload: TIngredientsTypesName;
}

export interface IIncreaseItemCountAC {
  readonly type: typeof INCREASE_ITEM_COUNT;
  readonly payload: string;
}

export interface IDecreaseItemCountAC {
  readonly type: typeof DECREASE_ITEM_COUNT;
  readonly payload: string;
}

export interface IClearItemCountAC {
  readonly type: typeof CLEAR_ITEMS_COUNT;
}

export type TIngredientsActions =
  | IIngredientsRequestAC
  | IIngredientsSuccessRequestAC
  | IIngredientsFailedRequestAC
  | IGetIngredientsTypesAC
  | ISetCurrentTabAC
  | IIncreaseItemCountAC
  | IDecreaseItemCountAC
  | IClearItemCountAC;

function ingredientsRequestAC() {
  return { type: GET_INGREDIENTS_REQUEST }
}

function ingredientsSuccessRequestAC(data: any) {
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

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(ingredientsRequestAC());
  getData().then(res => {
    dispatch(ingredientsSuccessRequestAC(res.data));
    dispatch(getIngredientsTypesAC());
  }).catch(() => dispatch(ingredientsFailedRequestAC()));
};