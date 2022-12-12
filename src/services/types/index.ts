import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { RootState } from '../store';
import { TIngredientsActions } from '../actions/ingredients';
import { TLoginActions } from '../actions/login';
import { TOrderActions } from '../actions/order';
import { TRecoveryPasswordActions } from '../actions/recovery-password';
import { TRegistrationActions } from '../actions/registration';
import { TResetPasswordActions } from '../actions/reset-password';
import { TUserActions } from '../actions/user';
import { TConstructorActions } from '../actions/constructor';
import { TModalsActions } from '../actions/modals';
import { TWSActions } from '../actions/use-socket';

export type TApplicationActions =
    | TModalsActions
    | TConstructorActions
    | TIngredientsActions
    | TLoginActions
    | TOrderActions
    | TRecoveryPasswordActions
    | TRegistrationActions
    | TResetPasswordActions
    | TWSActions
    | TUserActions;

export type AppDispatch = ActionCreator<
    ThunkDispatch<RootState, never, TApplicationActions>
>;
export type AppThunk<ReturnType = void> = ActionCreator<
    ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;