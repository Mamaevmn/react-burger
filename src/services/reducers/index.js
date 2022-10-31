import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { modalsReducer } from './modals';
import { orderReducer } from './order';
import { recoveryReducer } from './recovery-password';
import { loginReducer } from './login';
import { registrationReducer } from './registration';
import { resetPasswordReducer } from './reset-password';
import { userReducer } from './user';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    modals: modalsReducer,
    order: orderReducer,
    recovery: recoveryReducer,
    login: loginReducer,
    registration: registrationReducer,
    resetPassword: resetPasswordReducer,
    user: userReducer
});