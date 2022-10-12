import classNames from 'classnames';
import PropTypes from 'prop-types';
import ingredientsStyle from './burger-ingredients.module.css';
import Tabs from './burger-ingredients-types/burger-ingredients-types';
import BurgerIngredientsTypes from './burger-ingredients-block-goods/burger-ingredients-block-goods';
import { blocks, goodsPropTypes } from '../../utils/const';

function BurgerIngredients(props) {
    return (
        <section className={classNames(ingredientsStyle.section)}>
            <h1 className="text text_type_main-large mb-5">
                Соберите бургер
            </h1>
            <Tabs tabs={blocks}/>
            <BurgerIngredientsTypes data={props.data} blocks={blocks}/>
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(goodsPropTypes),
}

export default BurgerIngredients