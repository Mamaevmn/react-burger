import { TConstructorActions } from "../actions/constructor";
import {
    ADD_BUN,
    ADD_INGREDIENT,
    CALCULATE_TOTAL_PRICE,
    CLEAR_CONSTRUCTOR,
    DELETE_INGREDIENTS,
    UPDATE_CONSTRUCTOR_LIST
} from "../constants";
import { TFullIngredient } from "../types/data";

export type TConstructorInitialState = {
    items: Array<TFullIngredient>;
    bun: TFullIngredient;
    totalPrice: number;
};

const constructorInitialState: TConstructorInitialState = {
    items: [],
    bun: null,

    totalPrice: 0,
};

export const constructorReducer = (
    state = constructorInitialState,
    action: TConstructorActions
) => {
    switch (action.type) {
        case ADD_BUN: {
            return {
                ...state,
                bun: action.payload
            }
        }
        case ADD_INGREDIENT: {
            return {
                ...state,
                items: [
                    ...state.items,
                    action.payload
                ]
            }
        }
        case UPDATE_CONSTRUCTOR_LIST: {
            return {
                ...state,
                items: [...action.payload]
            }
        }
        case DELETE_INGREDIENTS: {
            return {
                ...state,
                items: [...state.items].filter(item => item.u_id !== action.payload)
            }
        }
        case CALCULATE_TOTAL_PRICE: {
            const total = state.bun ? (state.items.reduce((sum, item) => sum + item.price, 0) + state.bun.price * 2) : state.items.reduce((sum, item) => sum + item.price, 0);
            return {
                ...state,
                totalPrice: total,
            }
        }
        case CLEAR_CONSTRUCTOR: {
            return {
                items: [],
                bun: null,

                totalPrice: 0,
            }
        }
        default: {
            return state;
        }
    }
}