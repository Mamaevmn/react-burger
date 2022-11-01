import PropTypes from 'prop-types';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const goodsPropTypes = PropTypes.shape({
    u_id: PropTypes.string,
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string,
    calories: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    proteins: PropTypes.number,
    __v: PropTypes.number,
    counter: PropTypes.number,
})

export const headerLinkPropTypes = PropTypes.shape({
    classes: PropTypes.arrayOf(PropTypes.string),
    link: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.element,
})

export const profileTabsPropTypes = PropTypes.shape({
    link: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    help: PropTypes.string
})

export const ingredientPropTypes = {
    name: PropTypes.string,
    image_large: PropTypes.string,
    calories: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    proteins: PropTypes.number,
}

export const headerLinks = [
    {   
        classes: ['color-text--primary', 'mr-2', 'pr-5', 'pl-5', 'pt-4', 'pb-4'],
        link: '/',
        icon: <BurgerIcon type="primary" />,
        text: 'Конструктор'
    },
    {   
        classes: ['text_color_inactive', 'pr-5', 'pl-5', 'pt-4', 'pb-4'],
        link: '/',
        icon: <ListIcon type="secondary" />,
        text: 'Лента заказов'
    },
    {   
        classes: ['text_color_inactive', 'pr-5', 'pl-5', 'pt-4', 'pb-4', 'ml-a'],
        link: '/login',
        icon: <ProfileIcon type="secondary" />,
        text: 'Личный кабинет'
    },
];

export const profileTabs = [
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

export const ESC_KEYCODE = 27;

export const INGREDIENTS_TYPE = 'ingredient';
export const ORDER_TYPE = 'order';
export const INGREDIENTS_DETAIL_MODAL_TITLE = 'Детали ингредиента';

export const BUN_TYPE = 'bun'
export const MAIN_TYPE = 'main'
export const SAUCE_TYPE = 'sauce'

export const BUN_TYPE_RU_TRANSLATE = 'Булка'
export const MAIN_TYPE_RU_TRANSLATE = 'Начинка'
export const SAUCE_TYPE_RU_TRANSLATE = 'Соус'

export const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}