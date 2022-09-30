import PropTypes from 'prop-types';

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

export const tabPropTypes = PropTypes.shape({
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
})