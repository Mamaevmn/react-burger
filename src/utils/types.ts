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