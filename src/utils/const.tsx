import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { 
    THeaderLinks,
    TProfileTabs,
    TIngredientsTypesName,
    TIngredientsTypesNameOnRussia, 
} from "../services/types/data";


export const headerLinks: Array<THeaderLinks> = [
    {   
        link: '/',
        text: 'Конструктор',
        classes: ['color-text--primary', 'mr-2', 'pr-5', 'pt-4', 'pb-4'],
        icon: <BurgerIcon type="primary" />,
    },
    {   
        link: '/feed',
        text: 'Лента заказов',
        classes: ['text_color_inactive', 'pr-5', 'pl-5', 'pt-4', 'pb-4'],
        icon: <ListIcon type="secondary" />,
    },
    {   
        link: '/login',
        text: 'Личный кабинет',
        classes: ['text_color_inactive', 'pr-5', 'pl-5', 'pt-4', 'pb-4', 'ml-a'],
        icon: <ProfileIcon type="secondary" />,
    },
];

export const profileTabs: Array<TProfileTabs> = [
    {   
        link: '/profile',
        text: 'Профиль',
        help: 'В этом разделе вы можете изменить&nbsp;свои персональные данные'
    },
    {   
        link: '/profile/orders',
        text: 'История заказов',
        help: 'В этом разделе вы можете просмотреть свою историю заказов'
    },
    {   
        link: '/login',
        text: 'Выход',
    },
];

export const ESC_KEYCODE = 27 as const;

export const INGREDIENTS_TYPE = 'ingredient' as const;
export const ORDER_TYPE = 'order' as const;
export const ORDER_INFO_TYPE = 'order-info' as const;

export const BUN_TYPE: TIngredientsTypesName = 'bun'
export const MAIN_TYPE: TIngredientsTypesName = 'main'
export const SAUCE_TYPE: TIngredientsTypesName = 'sauce'

export const BUN_TYPE_RU_TRANSLATE: TIngredientsTypesNameOnRussia = 'Булка'
export const MAIN_TYPE_RU_TRANSLATE: TIngredientsTypesNameOnRussia = 'Начинка'
export const SAUCE_TYPE_RU_TRANSLATE: TIngredientsTypesNameOnRussia = 'Соус'

export const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export const calcWidthScrollbar = ():number => {
    const div: HTMLDivElement = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';

    document.body.append(div);
    const scrollWidth: number = div.offsetWidth - div.clientWidth;

    div.remove();

    return scrollWidth;
}