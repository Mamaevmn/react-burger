import { 
    ADD_BUN, 
    ADD_INGREDIENT, 
    CALCULATE_TOTAL_PRICE, 
    CLEAR_CONSTRUCTOR, 
    DELETE_INGREDIENTS, 
    UPDATE_CONSTRUCTOR_LIST 
} from "../constants";
import { TFullIngredient } from "../types/data";


export interface IAddBunAC {
    readonly type: typeof ADD_BUN;
    readonly payload: TFullIngredient
}

export interface IAddIngredientAC {
    readonly type: typeof ADD_INGREDIENT;
    readonly payload: TFullIngredient
}

export interface IUpdateConstructorListAC {
    readonly type: typeof UPDATE_CONSTRUCTOR_LIST;
    readonly payload: ReadonlyArray<TFullIngredient>
}

export interface IDeleteIngredientsAC {
    readonly type: typeof DELETE_INGREDIENTS;
    readonly payload: string
}

export interface ICalculateTotalPriceAC {
    readonly type: typeof CALCULATE_TOTAL_PRICE;
}

export interface IClearConstructorAC {
    readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TConstructorActions =
    | IAddBunAC
    | IAddIngredientAC
    | IUpdateConstructorListAC
    | IDeleteIngredientsAC
    | ICalculateTotalPriceAC
    | IClearConstructorAC;

export function addBunAC(item: TFullIngredient):IAddBunAC {
    return {
        type: ADD_BUN,
        payload: item,
    }
}

export function addIngredientAC(item: TFullIngredient):IAddIngredientAC {
    return {
        type: ADD_INGREDIENT,
        payload: item,
    }
}

export function updateConstructorListAC(item: ReadonlyArray<TFullIngredient>):IUpdateConstructorListAC {
    return {
        type: UPDATE_CONSTRUCTOR_LIST,
        payload: item,
    }
}

export function deleteIngredientsAC(item: string):IDeleteIngredientsAC {
    return {
        type: DELETE_INGREDIENTS,
        payload: item,
    }
}

export function calculateTotalPriceAC():ICalculateTotalPriceAC {
    return {
        type: CALCULATE_TOTAL_PRICE,
    }
}

export function clearConstructorAC():IClearConstructorAC {
    return {
        type: CLEAR_CONSTRUCTOR,
    }
}