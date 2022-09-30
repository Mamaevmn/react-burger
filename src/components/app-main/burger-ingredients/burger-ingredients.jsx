import classNames from 'classnames';
import PropTypes from 'prop-types';
import ingredientsStyle from './burger-ingredients.module.css'
import BurgerIngredientsTotal from './burger-ingredients-total/burger-ingredients-total';
import BurgerIngredientsList from './burger-ingredients-list/burger-ingredients-list';
import { goodsPropTypes } from '../../../const';

function BurgerIngredients(props) {
    return (
        <section className={classNames(ingredientsStyle.section, 'pt-25', 'pl-4', 'pr-4')}>
            <BurgerIngredientsList data={props.data} />
            <BurgerIngredientsTotal data={props.data} />
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(goodsPropTypes),
}

export default BurgerIngredients