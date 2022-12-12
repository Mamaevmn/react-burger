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
