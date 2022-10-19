import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { modalsReducer } from './modals';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    modals: modalsReducer,
    order: orderReducer
});