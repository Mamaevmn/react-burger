import styles from './ingredients.module.css';

import IngredientDetails from '../../components/modal-ingredient-details/modal-ingredient-details';

function Ingredients() {
    return (
        <section className={styles.wrapper}>
            <IngredientDetails /> 
        </section>
    )
}

export default Ingredients