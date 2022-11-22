export type TBASE_API_URL = 'https://norma.nomoreparties.space/api';
export type TINGREDIENTS_URL = `https://norma.nomoreparties.space/api/ingredients`;
export type TORDERS_URL = `https://norma.nomoreparties.space/api/orders`;
export type TPASSWORD_RECOVERY_URL = `https://norma.nomoreparties.space/api/password-reset`;
export type TPASSWORD_RESET_URL = `https://norma.nomoreparties.space/api/reset`;
export type TAUTH_URL = `https://norma.nomoreparties.space/api/auth`;
export type TLOGIN_URL = `https://norma.nomoreparties.space/api/auth/login`;
export type TLOGOUT_URL = `https://norma.nomoreparties.space/api/auth/logout`;
export type TUPDATE_TOKEN_URL = `https://norma.nomoreparties.space/api/auth/token`;
export type TUSER_REGISTRATION_URL = `https://norma.nomoreparties.space/api/auth/register`;
export type TUSER_INFO_URL = `https://norma.nomoreparties.space/api/auth/user`;

export type TESC_KEYCODE = 27;

export type TINGREDIENTS_TYPE = 'ingredient';
export type TORDER_TYPE = 'order';
export type TINGREDIENTS_DETAIL_MODAL_TITLE = 'Детали ингредиента';

export type TIngredientsTypesName = 'bun' | 'main' | 'sauce';
export type TIngredientsTypesNameOnRussia = 'Булка' | 'Начинка' | 'Соус';

export type TName = {name: string}
export type TEmail = {email: string}
export type TPassword = {password: string}
export type TToken = {token: string}

export type TLink = {
    link: string;
    text: string;
}

export type TCompound = {
    calories: number;
    fat: number;
    carbohydrates: number;
    proteins: number;
}

export type TIngredientsType = {
    type?: TIngredientsTypesName;
    name?: TIngredientsTypesNameOnRussia;
    u_id?: string;
};

export type THeaderLinks = TLink & {
    classes?: Array<string>;
    icon?: React.ReactNode;
}

export type TProfileTabs = TLink & {
    help?: string;
}

export type TShortIngredient = TName & TCompound & {
    image_large: string;
}

export type TFullIngredient = TShortIngredient & {
    u_id: string;
    _id: string;
    __v: number;
    counter: number;
    type: string;
    price: number;
    image: string;
    image_mobile: string;
}

export interface ILocation {
    from?: {
        pathname: string
    }
    background?: Location
}