import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { 
    TBUN_TYPE,
    TBUN_TYPE_RU_TRANSLATE,
    TESC_KEYCODE,
    THeaderLinks,
    TINGREDIENTS_DETAIL_MODAL_TITLE,
    TINGREDIENTS_TYPE, TMAIN_TYPE, TMAIN_TYPE_RU_TRANSLATE, TORDER_TYPE, TProfileTabs, TSAUCE_TYPE, TSAUCE_TYPE_RU_TRANSLATE,
} from "./types";

export const headerLinks: Array<THeaderLinks> = [
    {   
        link: '/',
        text: 'Конструктор',
        classes: ['color-text--primary', 'mr-2', 'pr-5', 'pl-5', 'pt-4', 'pb-4'],
        icon: <BurgerIcon type="primary" />,
    },
    {   
        link: '/',
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
        help: 'В этом разделе вы можете посмотреть историю заказов'
    },
    {   
        link: '/login',
        text: 'Выход',
    },
];

export const ESC_KEYCODE: TESC_KEYCODE = 27;

export const INGREDIENTS_TYPE: TINGREDIENTS_TYPE = 'ingredient';
export const ORDER_TYPE: TORDER_TYPE = 'order';
export const INGREDIENTS_DETAIL_MODAL_TITLE: TINGREDIENTS_DETAIL_MODAL_TITLE = 'Детали ингредиента';

export const BUN_TYPE: TBUN_TYPE = 'bun'
export const MAIN_TYPE: TMAIN_TYPE = 'main'
export const SAUCE_TYPE: TSAUCE_TYPE = 'sauce'

export const BUN_TYPE_RU_TRANSLATE: TBUN_TYPE_RU_TRANSLATE = 'Булка'
export const MAIN_TYPE_RU_TRANSLATE: TMAIN_TYPE_RU_TRANSLATE = 'Начинка'
export const SAUCE_TYPE_RU_TRANSLATE: TSAUCE_TYPE_RU_TRANSLATE = 'Соус'

export const checkResponse = (res: any) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}