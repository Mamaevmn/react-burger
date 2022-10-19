import PropTypes from 'prop-types';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const goodsPropTypes = PropTypes.shape({
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
    __v: PropTypes.number
})

export const headerLinkPropTypes = PropTypes.shape({
    classes: PropTypes.arrayOf(PropTypes.string),
    link: PropTypes.string.isRequired,
    icon: PropTypes.element,
    text: PropTypes.string
})

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
        link: '/',
        icon: <ProfileIcon type="secondary" />,
        text: 'Личный кабинет'
    },
];

export const ESC_KEYCODE = 27;

export const INGREDIENTS_TYPE = 'ingredient';
export const ORDER_TYPE = 'order';
export const INGREDIENTS_DETAIL_MODAL_TITLE = 'Детали ингредиента';