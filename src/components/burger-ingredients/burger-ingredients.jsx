import classNames from 'classnames';
import ingredientsStyle from './burger-ingredients.module.css';
import Tabs from './burger-ingredients-tabs/burger-ingredients-tabs';
import BurgerIngredientsTypes from './burger-ingredients-block-goods/burger-ingredients-block-goods';

function BurgerIngredients() {
    return (
        <section className={classNames(ingredientsStyle.section)}>
            <h1 className="text text_type_main-large mb-5">
                Соберите бургер
            </h1>
            <Tabs />
            <BurgerIngredientsTypes />
        </section>
    )
}

export default BurgerIngredients